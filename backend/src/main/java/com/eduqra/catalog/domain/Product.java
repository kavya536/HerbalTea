package com.eduqra.catalog.domain;

import java.util.UUID;

public class Product {
    private final UUID id;
    private final String sku;
    private final String name;
    private final String slug;
    private final String description;
    private final int priceCents;
    private final UUID categoryId;
    private final boolean active;

    public Product(UUID id, String sku, String name, String slug, String description, int priceCents, UUID categoryId, boolean active) {
        this.id = id;
        this.sku = sku;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.priceCents = priceCents;
        this.categoryId = categoryId;
        this.active = active;
    }

    public UUID getId() {
        return id;
    }

    public String getSku() {
        return sku;
    }

    public String getName() {
        return name;
    }

    public String getSlug() {
        return slug;
    }

    public String getDescription() {
        return description;
    }

    public int getPriceCents() {
        return priceCents;
    }

    public UUID getCategoryId() {
        return categoryId;
    }

    public boolean isActive() {
        return active;
    }
}
