package com.eduqra.catalog.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

public interface JpaProductRepository extends JpaRepository<ProductEntity, UUID> {
    Optional<ProductEntity> findBySlug(String slug);
    Optional<ProductEntity> findBySku(String sku);
    List<ProductEntity> findAllByActiveTrueAndDeletedAtIsNull();
}
