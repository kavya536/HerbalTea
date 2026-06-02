package com.eduqra.inventory.application.ports;

import com.eduqra.inventory.domain.InventoryStock;
import java.util.Optional;

public interface InventoryRepository {
    Optional<InventoryStock> findBySku(String sku);
    Optional<InventoryStock> findBySkuWithPessimisticLock(String sku);
    InventoryStock save(InventoryStock stock);
}
