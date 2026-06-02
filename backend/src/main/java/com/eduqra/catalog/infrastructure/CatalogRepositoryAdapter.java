package com.eduqra.catalog.infrastructure;

import com.eduqra.catalog.application.ports.CatalogRepository;
import com.eduqra.catalog.domain.Product;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class CatalogRepositoryAdapter implements CatalogRepository {

    private final JpaProductRepository jpaProductRepository;

    public CatalogRepositoryAdapter(JpaProductRepository jpaProductRepository) {
        this.jpaProductRepository = jpaProductRepository;
    }

    @Override
    @Cacheable(value = "products_id", key = "#id")
    public Optional<Product> findById(UUID id) {
        return jpaProductRepository.findById(id).map(this::toDomain);
    }

    @Override
    @Cacheable(value = "products_slug", key = "#slug")
    public Optional<Product> findBySlug(String slug) {
        return jpaProductRepository.findBySlug(slug).map(this::toDomain);
    }

    @Override
    @Cacheable(value = "products", key = "#sku")
    public Optional<Product> findBySku(String sku) {
        return jpaProductRepository.findBySku(sku).map(this::toDomain);
    }

    @Override
    @Cacheable(value = "active_products")
    public List<Product> findAllActive() {
        return jpaProductRepository.findAllByActiveTrueAndDeletedAtIsNull().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    @CacheEvict(value = {"products_id", "products_slug", "products", "active_products"}, allEntries = true)
    public Product save(Product product) {
        ProductEntity entity = toEntity(product);
        ProductEntity saved = jpaProductRepository.save(entity);
        return toDomain(saved);
    }

    private Product toDomain(ProductEntity entity) {
        return new Product(
                entity.getId(),
                entity.getSku(),
                entity.getName(),
                entity.getSlug(),
                entity.getDescription(),
                entity.getPriceCents(),
                entity.getCategoryId(),
                entity.isActive()
        );
    }

    private ProductEntity toEntity(Product product) {
        return new ProductEntity(
                product.getId(),
                product.getSku(),
                product.getName(),
                product.getSlug(),
                product.getDescription(),
                product.getPriceCents(),
                product.getCategoryId(),
                product.isActive(),
                null
        );
    }
}
