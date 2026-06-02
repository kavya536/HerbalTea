package com.eduqra.orders.application.ports;

import com.eduqra.orders.domain.Order;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

public interface OrderRepository {
    Optional<Order> findById(UUID id);
    List<Order> findByUserId(String userId);
    Order save(Order order);
}
