package com.eduqra.inventory.infrastructure;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JpaInventoryRepository extends JpaRepository<InventoryEntity, String> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT i FROM InventoryEntity i WHERE i.sku = :sku")
    Optional<InventoryEntity> findBySkuWithPessimisticLock(@Param("sku") String sku);
}
