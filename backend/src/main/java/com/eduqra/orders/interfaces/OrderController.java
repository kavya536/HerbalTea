package com.eduqra.orders.interfaces;

import com.eduqra.orders.application.ports.OrderRepository;
import com.eduqra.orders.domain.Order;
import com.eduqra.orders.domain.OrderItem;
import com.eduqra.orders.domain.OrderStatus;
import com.eduqra.shared.exception.ResourceNotFoundException;
import com.eduqra.shared.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody Order orderRequest) {
        UUID orderId = orderRequest.getId() == null ? UUID.randomUUID() : orderRequest.getId();
        String orderNumber = "ORD-" + System.currentTimeMillis();
        
        List<OrderItem> items = orderRequest.getItems().stream()
                .map(item -> new OrderItem(
                        item.getId() == null ? UUID.randomUUID() : item.getId(),
                        item.getSku(),
                        item.getQuantity(),
                        item.getUnitPriceCents()
                ))
                .collect(Collectors.toList());

        Order order = new Order(
                orderId,
                orderNumber,
                orderRequest.getUserId(),
                OrderStatus.PENDING,
                orderRequest.getTotalCents(),
                orderRequest.getDiscountCents(),
                orderRequest.getShippingAddressJson(),
                orderRequest.getBillingAddressJson(),
                Instant.now(),
                items
        );

        Order saved = orderRepository.save(order);
        return new ResponseEntity<>(ApiResponse.success("Order placed successfully", saved), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Order>> getOrderById(@PathVariable UUID id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));
        return ResponseEntity.ok(ApiResponse.success("Order details retrieved successfully", order));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<ApiResponse<List<Order>>> getOrdersByUserId(@PathVariable String userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success("User orders retrieved successfully", orders));
    }
}
