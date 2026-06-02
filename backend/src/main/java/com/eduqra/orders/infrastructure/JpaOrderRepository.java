package com.eduqra.orders.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface JpaOrderRepository extends JpaRepository<OrderEntity, OrderPk> {
    List<OrderEntity> findByUserId(String userId);

    @Query("SELECT o FROM OrderEntity o WHERE o.id = :id")
    Optional<OrderEntity> findByOrderId(@Param("id") UUID id);
}
