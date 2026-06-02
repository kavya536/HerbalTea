package com.eduqra.payments.domain;

import java.time.Instant;
import java.util.UUID;

public class Payment {
    private final UUID id;
    private final UUID orderId;
    private final Instant orderCreatedAt;
    private final PaymentGateway gateway;
    private final String transactionId;
    private final int amountCents;
    private final PaymentStatus status;
    private final String payloadJson;
    private final Instant createdAt;

    public Payment(UUID id, UUID orderId, Instant orderCreatedAt, PaymentGateway gateway, String transactionId, int amountCents, PaymentStatus status, String payloadJson, Instant createdAt) {
        this.id = id;
        this.orderId = orderId;
        this.orderCreatedAt = orderCreatedAt;
        this.gateway = gateway;
        this.transactionId = transactionId;
        this.amountCents = amountCents;
        this.status = status;
        this.payloadJson = payloadJson;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public Instant getOrderCreatedAt() {
        return orderCreatedAt;
    }

    public PaymentGateway getGateway() {
        return gateway;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public int getAmountCents() {
        return amountCents;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public String getPayloadJson() {
        return payloadJson;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }
}
