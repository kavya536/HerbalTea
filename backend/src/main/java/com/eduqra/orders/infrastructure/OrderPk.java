package com.eduqra.orders.infrastructure;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

public class OrderPk implements Serializable {
    private UUID id;
    private Instant createdAt;

    public OrderPk() {}

    public OrderPk(UUID id, Instant createdAt) {
        this.id = id;
        this.createdAt = createdAt;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderPk orderPk = (OrderPk) o;
        return Objects.equals(id, orderPk.id) && Objects.equals(createdAt, orderPk.createdAt);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, createdAt);
    }
}
