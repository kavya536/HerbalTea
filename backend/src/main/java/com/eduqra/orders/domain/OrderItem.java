package com.eduqra.orders.domain;

import java.util.UUID;

public class OrderItem {
    private final UUID id;
    private final String sku;
    private final int quantity;
    private final int unitPriceCents;

    public OrderItem(UUID id, String sku, int quantity, int unitPriceCents) {
        this.id = id;
        this.sku = sku;
        this.quantity = quantity;
        this.unitPriceCents = unitPriceCents;
    }

    public UUID getId() {
        return id;
    }

    public String getSku() {
        return sku;
    }

    public int getQuantity() {
        return quantity;
    }

    public int getUnitPriceCents() {
        return unitPriceCents;
    }

    public int getTotalPriceCents() {
        return quantity * unitPriceCents;
    }
}
