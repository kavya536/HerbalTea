package com.eduqra.catalog.domain;

import java.util.UUID;

public class Category {
    private final UUID id;
    private final String name;
    private final String slug;
    private final UUID parentId;
    private final boolean active;

    public Category(UUID id, String name, String slug, UUID parentId, boolean active) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.parentId = parentId;
        this.active = active;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSlug() {
        return slug;
    }

    public UUID getParentId() {
        return parentId;
    }

    public boolean isActive() {
        return active;
    }
}
