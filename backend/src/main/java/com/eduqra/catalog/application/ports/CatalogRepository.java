package com.eduqra.catalog.application.ports;

import com.eduqra.catalog.domain.Product;
import java.util.Optional;
import java.util.UUID;
import java.util.List;

public interface CatalogRepository {
    Optional<Product> findById(UUID id);
    Optional<Product> findBySlug(String slug);
    Optional<Product> findBySku(String sku);
    List<Product> findAllActive();
    Product save(Product product);
}
