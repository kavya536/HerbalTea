package com.eduqra.orders.domain;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public class Order {
    private final UUID id;
    private final String orderNumber;
    private final String userId;
    private final OrderStatus status;
    private final int totalCents;
    private final int discountCents;
    private final String shippingAddressJson;
    private final String billingAddressJson;
    private final Instant createdAt;
    private final List<OrderItem> items;

    public Order(UUID id, String orderNumber, String userId, OrderStatus status, int totalCents, int discountCents, String shippingAddressJson, String billingAddressJson, Instant createdAt, List<OrderItem> items) {
        this.id = id;
        this.orderNumber = orderNumber;
        this.userId = userId;
        this.status = status;
        this.totalCents = totalCents;
        this.discountCents = discountCents;
        this.shippingAddressJson = shippingAddressJson;
        this.billingAddressJson = billingAddressJson;
        this.createdAt = createdAt;
        this.items = items;
    }

    public UUID getId() {
        return id;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public String getUserId() {
        return userId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public int getTotalCents() {
        return totalCents;
    }

    public int getDiscountCents() {
        return discountCents;
    }

    public String getShippingAddressJson() {
        return shippingAddressJson;
    }

    public String getBillingAddressJson() {
        return billingAddressJson;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public List<OrderItem> getItems() {
        return items;
    }
}
