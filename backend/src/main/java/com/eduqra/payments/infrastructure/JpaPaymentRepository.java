package com.eduqra.payments.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JpaPaymentRepository extends JpaRepository<PaymentEntity, UUID> {
    Optional<PaymentEntity> findByTransactionId(String transactionId);
    List<PaymentEntity> findByOrderId(UUID orderId);
}
