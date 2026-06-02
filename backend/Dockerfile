# --- Build Stage ---
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

# Copy Gradle wrapper and settings files first to cache dependencies
COPY gradle/ gradle/
COPY gradlew build.gradle settings.gradle ./

# Ensure gradlew has execution rights
RUN chmod +x gradlew

# Download dependencies (caches dependencies)
RUN ./gradlew dependencies --no-daemon || true

# Copy source files
COPY src/ src/

# Build project jar file without running tests
RUN ./gradlew bootJar -x test --no-daemon

# Download OpenTelemetry Java Agent
ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v2.4.0/opentelemetry-javaagent.jar /app/opentelemetry-javaagent.jar
RUN chmod 644 /app/opentelemetry-javaagent.jar

# --- Run Stage ---
FROM eclipse-temurin:21-jre AS runner
WORKDIR /app

# Install curl for healthchecks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Create a non-root system user for runtime security
RUN groupadd -g 1001 appuser && useradd -u 1001 -g appuser -m appuser
USER appuser

# Copy build artifacts and OpenTelemetry Java Agent
COPY --from=builder /app/build/libs/*.jar app.jar
COPY --from=builder /app/opentelemetry-javaagent.jar opentelemetry-javaagent.jar

EXPOSE 8080

# Environment variables
ENV SPRING_PROFILES_ACTIVE=prod
ENV JAVA_OPTS="-javaagent:/app/opentelemetry-javaagent.jar -XX:InitialRAMPercentage=50.0 -XX:MaxRAMPercentage=75.0 -XX:+UseG1GC -XX:+UseStringDeduplication"

# OpenTelemetry Default Configurations
ENV OTEL_SERVICE_NAME=platform
ENV OTEL_TRACES_EXPORTER=otlp
ENV OTEL_METRICS_EXPORTER=otlp
ENV OTEL_LOGS_EXPORTER=none
ENV OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317

HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health/readiness || exit 1

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
