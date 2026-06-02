package com.eduqra.orders.infrastructure;

import com.eduqra.orders.domain.OrderStatus;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@IdClass(OrderPk.class)
public class OrderEntity {

    @Id
    private UUID id;

    @Id
    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "order_number", nullable = false, length = 100)
    private String orderNumber;

    @Column(name = "user_id", nullable = false, length = 128)
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderStatus status;

    @Column(name = "total_cents", nullable = false)
    private int totalCents;

    @Column(name = "discount_cents", nullable = false)
    private int discountCents;

    @Column(name = "shipping_address", nullable = false, columnDefinition = "jsonb")
    private String shippingAddress;

    @Column(name = "billing_address", nullable = false, columnDefinition = "jsonb")
    private String billingAddress;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItemEntity> items = new ArrayList<>();

    public OrderEntity() {}

    public OrderEntity(UUID id, Instant createdAt, String orderNumber, String userId, OrderStatus status, int totalCents, int discountCents, String shippingAddress, String billingAddress, Instant updatedAt) {
        this.id = id;
        this.createdAt = createdAt;
        this.orderNumber = orderNumber;
        this.userId = userId;
        this.status = status;
        this.totalCents = totalCents;
        this.discountCents = discountCents;
        this.shippingAddress = shippingAddress;
        this.billingAddress = billingAddress;
        this.updatedAt = updatedAt;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(String orderNumber) {
        this.orderNumber = orderNumber;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public int getTotalCents() {
        return totalCents;
    }

    public void setTotalCents(int totalCents) {
        this.totalCents = totalCents;
    }

    public int getDiscountCents() {
        return discountCents;
    }

    public void setDiscountCents(int discountCents) {
        this.discountCents = discountCents;
    }

    public String getShippingAddress() {
        return shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<OrderItemEntity> getItems() {
        return items;
    }

    public void setItems(List<OrderItemEntity> items) {
        this.items = items;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }
}
