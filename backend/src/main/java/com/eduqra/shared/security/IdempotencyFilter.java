package com.eduqra.shared.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingResponseWrapper;

import java.io.IOException;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class IdempotencyFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(IdempotencyFilter.class);

    private static final String IDEMPOTENCY_KEY_HEADER = "Idempotency-Key";
    private static final String REDIS_PREFIX = "idempotency:";
    private static final long DEFAULT_TTL_MINUTES = 60; // Cache responses for 1 hour

    private final StringRedisTemplate redisTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public IdempotencyFilter(StringRedisTemplate redisTemplate, ObjectMapper objectMapper) {
        this.redisTemplate = redisTemplate;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Apply only to mutative operations (POST/PUT/PATCH) and when Idempotency-Key is provided
        String idempotencyKey = request.getHeader(IDEMPOTENCY_KEY_HEADER);
        String method = request.getMethod();

        if (idempotencyKey == null || idempotencyKey.trim().isEmpty() || 
            (!method.equalsIgnoreCase("POST") && !method.equalsIgnoreCase("PUT") && !method.equalsIgnoreCase("PATCH"))) {
            filterChain.doFilter(request, response);
            return;
        }

        String redisKey = REDIS_PREFIX + idempotencyKey;

        // Atomic lock attempt
        // We set status as IN_PROGRESS. If set fails, the key already exists.
        Boolean isNewRequest = redisTemplate.opsForValue().setIfAbsent(
                redisKey, 
                "{\"status\":\"IN_PROGRESS\"}", 
                DEFAULT_TTL_MINUTES, 
                TimeUnit.MINUTES
        );

        if (Boolean.FALSE.equals(isNewRequest)) {
            // Key already exists, handle duplicate request
            handleDuplicateRequest(response, redisKey);
            return;
        }

        // Wrap response to capture output body
        ContentCachingResponseWrapper wrappedResponse = new ContentCachingResponseWrapper(response);

        try {
            filterChain.doFilter(request, wrappedResponse);
            
            // Only cache successful and client-side retry-safe statuses (e.g. 2xx, 4xx).
            // Do not cache 5xx Server Errors, so clients can retry later if our server failed.
            int statusCode = wrappedResponse.getStatus();
            if (statusCode >= 200 && statusCode < 500) {
                String responseBody = new String(wrappedResponse.getContentAsByteArray(), wrappedResponse.getCharacterEncoding());
                saveResponseToCache(redisKey, statusCode, responseBody);
            } else {
                // If it failed with 5xx, remove lock so they can try again
                redisTemplate.delete(redisKey);
            }
            
            wrappedResponse.copyBodyToResponse();
        } catch (Exception e) {
            // Clean up Redis lock on exception so request can be retried
            redisTemplate.delete(redisKey);
            throw e;
        }
    }

    private void handleDuplicateRequest(HttpServletResponse response, String redisKey) throws IOException {
        String cachedValue = redisTemplate.opsForValue().get(redisKey);

        if (cachedValue == null) {
            // Race condition: key expired or was deleted. Fail gracefully and allow retry
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Conflict\", \"message\": \"State conflict, please retry.\"}");
            return;
        }

        try {
            IdempotencyRecord record = objectMapper.readValue(cachedValue, IdempotencyRecord.class);

            if ("IN_PROGRESS".equals(record.getStatus())) {
                // Request is currently running in another thread/process
                response.setStatus(HttpServletResponse.SC_CONFLICT);
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Conflict\", \"message\": \"A request with the same Idempotency-Key is already in progress.\"}");
                log.warn("Blocked duplicate concurrent request for key: {}", redisKey);
            } else if ("COMPLETED".equals(record.getStatus())) {
                // Return cached response
                response.setStatus(record.getStatusCode());
                response.setContentType("application/json");
                response.addHeader("X-Cache-Lookup", "HIT - Idempotent");
                response.getWriter().write(record.getBody());
                log.info("Returned cached idempotent response for key: {}", redisKey);
            }
        } catch (Exception e) {
            log.error("Failed to parse cached idempotency record for key: {}", redisKey, e);
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Internal Server Error\", \"message\": \"Failed to resolve idempotency state.\"}");
        }
    }

    private void saveResponseToCache(String redisKey, int statusCode, String responseBody) {
        try {
            IdempotencyRecord record = new IdempotencyRecord();
            record.setStatus("COMPLETED");
            record.setStatusCode(statusCode);
            record.setBody(responseBody);

            String jsonString = objectMapper.writeValueAsString(record);
            redisTemplate.opsForValue().set(redisKey, jsonString, Duration.ofMinutes(DEFAULT_TTL_MINUTES));
        } catch (Exception e) {
            log.error("Failed to cache response for idempotency key: {}", redisKey, e);
        }
    }

    // Static nested class for serialization
    public static class IdempotencyRecord {
        private String status;
        private int statusCode;
        private String body;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public int getStatusCode() { return statusCode; }
        public void setStatusCode(int statusCode) { this.statusCode = statusCode; }

        public String getBody() { return body; }
        public void setBody(String body) { this.body = body; }
    }
}
