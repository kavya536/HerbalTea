package com.eduqra.inventory.domain;

public class InventoryStock {
    private final String sku;
    private final int availableQty;
    private final int reservedQty;
    private final long version;

    public InventoryStock(String sku, int availableQty, int reservedQty, long version) {
        this.sku = sku;
        this.availableQty = availableQty;
        this.reservedQty = reservedQty;
        this.version = version;
    }

    public String getSku() {
        return sku;
    }

    public int getAvailableQty() {
        return availableQty;
    }

    public int getReservedQty() {
        return reservedQty;
    }

    public long getVersion() {
        return version;
    }
}
