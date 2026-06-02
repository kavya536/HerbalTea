package com.eduqra.orders.infrastructure;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "order_items")
public class OrderItemEntity {

    @Id
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
        @JoinColumn(name = "order_id", referencedColumnName = "id"),
        @JoinColumn(name = "order_created_at", referencedColumnName = "created_at")
    })
    private OrderEntity order;

    @Column(nullable = false, length = 100)
    private String sku;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "unit_price_cents", nullable = false)
    private int unitPriceCents;

    public OrderItemEntity() {}

    public OrderItemEntity(UUID id, OrderEntity order, String sku, int quantity, int unitPriceCents) {
        this.id = id;
        this.order = order;
        this.sku = sku;
        this.quantity = quantity;
        this.unitPriceCents = unitPriceCents;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getUnitPriceCents() {
        return unitPriceCents;
    }

    public void setUnitPriceCents(int unitPriceCents) {
        this.unitPriceCents = unitPriceCents;
    }
}
