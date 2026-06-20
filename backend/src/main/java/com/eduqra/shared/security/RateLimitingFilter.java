package com.eduqra.shared.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.distributed.ExpirationAfterWriteStrategy;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.codec.ByteArrayCodec;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Counter;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Supplier;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(RateLimitingFilter.class);

    private final RedisConnectionFactory redisConnectionFactory;
    private final MeterRegistry meterRegistry;

    private ProxyManager<byte[]> proxyManager;
    private final ConcurrentHashMap<String, Bucket> localBuckets = new ConcurrentHashMap<>();
    private boolean useRedis = false;

    private Counter rateLimitExceededCounter;

    @Autowired
    public RateLimitingFilter(RedisConnectionFactory redisConnectionFactory, MeterRegistry meterRegistry) {
        this.redisConnectionFactory = redisConnectionFactory;
        this.meterRegistry = meterRegistry;
    }

    @PostConstruct
    public void init() {
        this.rateLimitExceededCounter = Counter.builder("rate_limit_exceeded_total")
                .description("Total number of rate limited requests")
                .register(meterRegistry);

        try {
            if (redisConnectionFactory instanceof LettuceConnectionFactory lettuceFactory) {
                Object nativeClient = lettuceFactory.getNativeClient();
                if (nativeClient instanceof RedisClient redisClient) {
                    StatefulRedisConnection<byte[], byte[]> connection = redisClient.connect(ByteArrayCodec.INSTANCE);
                    this.proxyManager = LettuceBasedProxyManager.builderFor(connection)
                            .withClientSideConfig(io.github.bucket4j.distributed.proxy.ClientSideConfig.getDefault()
                                .withExpirationAfterWriteStrategy(ExpirationAfterWriteStrategy.fixedTimeToLive(Duration.ofHours(1))))
                            .build();
                    this.useRedis = true;
                    log.info("Initialized Redis-backed distributed rate limiter using Lettuce");
                } else {
                    log.warn("Native client is not an instance of Lettuce RedisClient. Falling back to local in-memory rate limiting.");
                }
            } else {
                log.warn("RedisConnectionFactory is not LettuceConnectionFactory. Falling back to local in-memory rate limiting.");
            }
        } catch (Exception e) {
            log.error("Failed to initialize Redis-backed rate limiter. Falling back to local in-memory rate limiting.", e);
        }
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String path = request.getRequestURI();
        
        // Exclude actuator health checks and public static content from rate limiting
        if (path.startsWith("/actuator/") || path.contains("/static/") || path.equals("/favicon.ico")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Determine rate limit configuration and key
        String limitKey;
        Bandwidth limitRules;
        String limitType;

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            // Rate limit by authenticated user ID
            limitKey = "user:" + auth.getName() + ":" + getEndpointGroup(path);
            limitRules = getRulesForEndpoint(path, true);
            limitType = "USER";
        } else {
            // Rate limit by client IP address
            String ip = getClientIP(request);
            limitKey = "ip:" + ip + ":" + getEndpointGroup(path);
            limitRules = getRulesForEndpoint(path, false);
            limitType = "IP";
        }

        boolean isAllowed = tryConsume(limitKey, limitRules);

        if (!isAllowed) {
            rateLimitExceededCounter.increment();
            meterRegistry.counter("rate_limit_exceeded", "type", limitType, "path", path).increment();
            
            response.setStatus(429);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Too Many Requests\", \"message\": \"Rate limit exceeded. Please try again later.\"}");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private boolean tryConsume(String key, Bandwidth limitRules) {
        if (useRedis && proxyManager != null) {
            try {
                byte[] keyBytes = key.getBytes();
                Supplier<BucketConfiguration> configSupplier = () -> BucketConfiguration.builder()
                        .addLimit(limitRules)
                        .build();
                return proxyManager.builder().build(keyBytes, configSupplier).tryConsume(1);
            } catch (Exception e) {
                log.warn("Redis rate limiter failed for key: {}. Falling back to in-memory.", key, e);
                // Fall through to in-memory rate limiting on Redis failure
            }
        }

        // In-memory fallback
        Bucket bucket = localBuckets.computeIfAbsent(key, k -> Bucket.builder().addLimit(limitRules).build());
        return bucket.tryConsume(1);
    }

    private Bandwidth getRulesForEndpoint(String path, boolean isAuthenticated) {
        if (path.startsWith("/api/v1/checkout") || path.startsWith("/api/v1/payments")) {
            // Highly sensitive payment endpoints: Strict limit to prevent abuse/brute force
            return isAuthenticated 
                ? Bandwidth.builder().capacity(15).refillIntervally(15, Duration.ofMinutes(1)).build()
                : Bandwidth.builder().capacity(5).refillIntervally(5, Duration.ofMinutes(1)).build();
        } else if (path.startsWith("/api/v1/auth")) {
            // Auth endpoints: Prevent brute forcing logins
            return Bandwidth.builder().capacity(10).refillIntervally(10, Duration.ofMinutes(1)).build();
        } else if (path.startsWith("/api/v1/catalog")) {
            // Catalog: Higher capacity for browsing products
            return Bandwidth.builder().capacity(100).refillIntervally(100, Duration.ofMinutes(1)).build();
        }
        // Default standard limits
        return isAuthenticated
            ? Bandwidth.builder().capacity(60).refillIntervally(60, Duration.ofMinutes(1)).build()
            : Bandwidth.builder().capacity(30).refillIntervally(30, Duration.ofMinutes(1)).build();
    }

    private String getEndpointGroup(String path) {
        if (path.startsWith("/api/v1/checkout") || path.startsWith("/api/v1/payments")) {
            return "checkout";
        } else if (path.startsWith("/api/v1/auth")) {
            return "auth";
        } else if (path.startsWith("/api/v1/catalog")) {
            return "catalog";
        }
        return "default";
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null || xfHeader.isEmpty()) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0].trim();
    }
}
