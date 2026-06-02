package com.eduqra.inventory.infrastructure;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "inventory")
public class InventoryEntity {

    @Id
    @Column(length = 100)
    private String sku;

    @Column(name = "available_qty", nullable = false)
    private int availableQty;

    @Column(name = "reserved_qty", nullable = false)
    private int reservedQty;

    @Version
    private long version;

    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    public InventoryEntity() {}

    public InventoryEntity(String sku, int availableQty, int reservedQty, long version) {
        this.sku = sku;
        this.availableQty = availableQty;
        this.reservedQty = reservedQty;
        this.version = version;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public int getAvailableQty() {
        return availableQty;
    }

    public void setAvailableQty(int availableQty) {
        this.availableQty = availableQty;
    }

    public int getReservedQty() {
        return reservedQty;
    }

    public void setReservedQty(int reservedQty) {
        this.reservedQty = reservedQty;
    }

    public long getVersion() {
        return version;
    }

    public void setVersion(long version) {
        this.version = version;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = Instant.now();
    }
}
