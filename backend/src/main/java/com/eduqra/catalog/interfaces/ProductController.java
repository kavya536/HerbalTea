package com.eduqra.catalog.interfaces;

import com.eduqra.catalog.application.ports.CatalogRepository;
import com.eduqra.catalog.domain.Product;
import com.eduqra.shared.exception.ResourceNotFoundException;
import com.eduqra.shared.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final CatalogRepository catalogRepository;

    public ProductController(CatalogRepository catalogRepository) {
        this.catalogRepository = catalogRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Product>>> getAllActiveProducts() {
        List<Product> products = catalogRepository.findAllActive();
        return ResponseEntity.ok(ApiResponse.success("Active products retrieved successfully", products));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<Product>> getProductBySlug(@PathVariable String slug) {
        Product product = catalogRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug));
        return ResponseEntity.ok(ApiResponse.success("Product details retrieved successfully", product));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Product>> createProduct(@RequestBody Product productRequest) {
        UUID id = productRequest.getId() == null ? UUID.randomUUID() : productRequest.getId();
        Product product = new Product(
                id,
                productRequest.getSku(),
                productRequest.getName(),
                productRequest.getSlug(),
                productRequest.getDescription(),
                productRequest.getPriceCents(),
                productRequest.getCategoryId(),
                productRequest.isActive()
        );
        Product saved = catalogRepository.save(product);
        return new ResponseEntity<>(ApiResponse.success("Product created successfully", saved), HttpStatus.CREATED);
    }
}
