package com.eduqra.orders.domain;

public enum OrderStatus {
    PENDING,
    PROCESSING,
    AUTHORIZED,
    PAID,
    FAILED,
    CANCELLED,
    REFUNDED,
    PARTIALLY_REFUNDED
}
