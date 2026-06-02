package com.eduqra.shared.outbox;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@EnableScheduling
public class OutboxPublisher {

    private static final Logger log = LoggerFactory.getLogger(OutboxPublisher.class);

    private final EventOutboxRepository outboxRepository;
    private final StringRedisTemplate redisTemplate;

    public OutboxPublisher(EventOutboxRepository outboxRepository, StringRedisTemplate redisTemplate) {
        this.outboxRepository = outboxRepository;
        this.redisTemplate = redisTemplate;
    }

    @Scheduled(fixedDelayString = "${app.outbox.polling-rate-ms:1000}")
    @Transactional
    public void publishPendingEvents() {
        List<EventOutbox> pendingEvents = outboxRepository.findByProcessedFalseOrderByCreatedAtAsc();
        
        if (pendingEvents.isEmpty()) {
            return;
        }

        log.info("Found {} pending outbox events to publish.", pendingEvents.size());

        for (EventOutbox event : pendingEvents) {
            try {
                String redisChannel = "events:" + event.getAggregateType().toLowerCase();
                String message = event.getPayload();
                
                redisTemplate.convertAndSend(redisChannel, message);
                
                event.setProcessed(true);
                outboxRepository.save(event);
                
                log.info("Successfully published outbox event: {} to Redis channel: {}", event.getId(), redisChannel);
            } catch (Exception e) {
                log.error("Failed to publish outbox event: {}. Error: {}", event.getId(), e.getMessage(), e);
            }
        }
    }
}
