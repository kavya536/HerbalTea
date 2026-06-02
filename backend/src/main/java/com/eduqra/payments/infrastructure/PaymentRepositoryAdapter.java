package com.eduqra.payments.infrastructure;

import com.eduqra.payments.application.ports.PaymentRepository;
import com.eduqra.payments.domain.Payment;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class PaymentRepositoryAdapter implements PaymentRepository {

    private final JpaPaymentRepository jpaPaymentRepository;

    public PaymentRepositoryAdapter(JpaPaymentRepository jpaPaymentRepository) {
        this.jpaPaymentRepository = jpaPaymentRepository;
    }

    @Override
    public Optional<Payment> findById(UUID id) {
        return jpaPaymentRepository.findById(id).map(this::toDomain);
    }

    @Override
    public Optional<Payment> findByTransactionId(String transactionId) {
        return jpaPaymentRepository.findByTransactionId(transactionId).map(this::toDomain);
    }

    @Override
    public List<Payment> findByOrderId(UUID orderId) {
        return jpaPaymentRepository.findByOrderId(orderId).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Payment save(Payment payment) {
        PaymentEntity entity = toEntity(payment);
        PaymentEntity saved = jpaPaymentRepository.save(entity);
        return toDomain(saved);
    }

    private Payment toDomain(PaymentEntity entity) {
        return new Payment(
                entity.getId(),
                entity.getOrderId(),
                entity.getOrderCreatedAt(),
                entity.getGateway(),
                entity.getTransactionId(),
                entity.getAmountCents(),
                entity.getStatus(),
                entity.getPayload(),
                entity.getCreatedAt()
        );
    }

    private PaymentEntity toEntity(Payment payment) {
        Instant createdAt = payment.getCreatedAt() == null ? Instant.now() : payment.getCreatedAt();
        return new PaymentEntity(
                payment.getId(),
                payment.getOrderId(),
                payment.getOrderCreatedAt(),
                payment.getGateway(),
                payment.getTransactionId(),
                payment.getAmountCents(),
                payment.getStatus(),
                payment.getPayloadJson(),
                createdAt
        );
    }
}
