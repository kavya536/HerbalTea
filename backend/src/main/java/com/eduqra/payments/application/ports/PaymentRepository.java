package com.eduqra.payments.application.ports;

import com.eduqra.payments.domain.Payment;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

public interface PaymentRepository {
    Optional<Payment> findById(UUID id);
    Optional<Payment> findByTransactionId(String transactionId);
    List<Payment> findByOrderId(UUID orderId);
    Payment save(Payment payment);
}
