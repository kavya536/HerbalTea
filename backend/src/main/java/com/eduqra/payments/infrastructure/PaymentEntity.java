package com.eduqra.payments.infrastructure;

import com.eduqra.payments.domain.PaymentGateway;
import com.eduqra.payments.domain.PaymentStatus;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "payments")
public class PaymentEntity {

    @Id
    private UUID id;

    @Column(name = "order_id", nullable = false)
    private UUID orderId;

    @Column(name = "order_created_at", nullable = false)
    private Instant orderCreatedAt;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentGateway gateway;

    @Column(name = "transaction_id", nullable = false, unique = true, length = 255)
    private String transactionId;

    @Column(name = "amount_cents", nullable = false)
    private int amountCents;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus status;

    @Column(columnDefinition = "jsonb")
    private String payload;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();

    public PaymentEntity() {}

    public PaymentEntity(UUID id, UUID orderId, Instant orderCreatedAt, PaymentGateway gateway, String transactionId, int amountCents, PaymentStatus status, String payload, Instant createdAt) {
        this.id = id;
        this.orderId = orderId;
        this.orderCreatedAt = orderCreatedAt;
        this.gateway = gateway;
        this.transactionId = transactionId;
        this.amountCents = amountCents;
        this.status = status;
        this.payload = payload;
        this.createdAt = createdAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public Instant getOrderCreatedAt() {
        return orderCreatedAt;
    }

    public void setOrderCreatedAt(Instant orderCreatedAt) {
        this.orderCreatedAt = orderCreatedAt;
    }

    public PaymentGateway getGateway() {
        return gateway;
    }

    public void setGateway(PaymentGateway gateway) {
        this.gateway = gateway;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public int getAmountCents() {
        return amountCents;
    }

    public void setAmountCents(int amountCents) {
        this.amountCents = amountCents;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
