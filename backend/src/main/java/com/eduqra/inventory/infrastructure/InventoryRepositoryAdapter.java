package com.eduqra.inventory.infrastructure;

import com.eduqra.inventory.application.ports.InventoryRepository;
import com.eduqra.inventory.domain.InventoryStock;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class InventoryRepositoryAdapter implements InventoryRepository {

    private final JpaInventoryRepository jpaInventoryRepository;

    public InventoryRepositoryAdapter(JpaInventoryRepository jpaInventoryRepository) {
        this.jpaInventoryRepository = jpaInventoryRepository;
    }

    @Override
    public Optional<InventoryStock> findBySku(String sku) {
        return jpaInventoryRepository.findById(sku).map(this::toDomain);
    }

    @Override
    public Optional<InventoryStock> findBySkuWithPessimisticLock(String sku) {
        return jpaInventoryRepository.findBySkuWithPessimisticLock(sku).map(this::toDomain);
    }

    @Override
    public InventoryStock save(InventoryStock stock) {
        InventoryEntity entity = toEntity(stock);
        InventoryEntity saved = jpaInventoryRepository.save(entity);
        return toDomain(saved);
    }

    private InventoryStock toDomain(InventoryEntity entity) {
        return new InventoryStock(
                entity.getSku(),
                entity.getAvailableQty(),
                entity.getReservedQty(),
                entity.getVersion()
        );
    }

    private InventoryEntity toEntity(InventoryStock stock) {
        return new InventoryEntity(
                stock.getSku(),
                stock.getAvailableQty(),
                stock.getReservedQty(),
                stock.getVersion()
        );
    }
}
