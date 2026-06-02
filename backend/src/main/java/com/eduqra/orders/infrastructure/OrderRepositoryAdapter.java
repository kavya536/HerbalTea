package com.eduqra.orders.infrastructure;

import com.eduqra.orders.application.ports.OrderRepository;
import com.eduqra.orders.domain.Order;
import com.eduqra.orders.domain.OrderItem;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class OrderRepositoryAdapter implements OrderRepository {

    private final JpaOrderRepository jpaOrderRepository;

    public OrderRepositoryAdapter(JpaOrderRepository jpaOrderRepository) {
        this.jpaOrderRepository = jpaOrderRepository;
    }

    @Override
    public Optional<Order> findById(UUID id) {
        return jpaOrderRepository.findByOrderId(id).map(this::toDomain);
    }

    @Override
    public List<Order> findByUserId(String userId) {
        return jpaOrderRepository.findByUserId(userId).stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Order save(Order order) {
        OrderEntity entity = toEntity(order);
        
        if (order.getItems() != null) {
            List<OrderItemEntity> itemEntities = order.getItems().stream()
                    .map(item -> new OrderItemEntity(
                            item.getId() == null ? UUID.randomUUID() : item.getId(),
                            entity,
                            item.getSku(),
                            item.getQuantity(),
                            item.getUnitPriceCents()
                    ))
                    .collect(Collectors.toList());
            entity.setItems(itemEntities);
        }

        OrderEntity saved = jpaOrderRepository.save(entity);
        return toDomain(saved);
    }

    private Order toDomain(OrderEntity entity) {
        List<OrderItem> items = entity.getItems().stream()
                .map(item -> new OrderItem(
                        item.getId(),
                        item.getSku(),
                        item.getQuantity(),
                        item.getUnitPriceCents()
                ))
                .collect(Collectors.toList());

        return new Order(
                entity.getId(),
                entity.getOrderNumber(),
                entity.getUserId(),
                entity.getStatus(),
                entity.getTotalCents(),
                entity.getDiscountCents(),
                entity.getShippingAddress(),
                entity.getBillingAddress(),
                entity.getCreatedAt(),
                items
        );
    }

    private OrderEntity toEntity(Order order) {
        Instant createdAt = order.getCreatedAt() == null ? Instant.now() : order.getCreatedAt();
        return new OrderEntity(
                order.getId(),
                createdAt,
                order.getOrderNumber(),
                order.getUserId(),
                order.getStatus(),
                order.getTotalCents(),
                order.getDiscountCents(),
                order.getShippingAddressJson(),
                order.getBillingAddressJson(),
                Instant.now()
        );
    }
}
