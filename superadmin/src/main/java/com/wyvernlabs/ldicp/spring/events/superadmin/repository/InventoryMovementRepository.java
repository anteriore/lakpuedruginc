package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.InventoryMovement.InventoryMovement;

public interface InventoryMovementRepository extends JpaRepository<InventoryMovement, Long> {

	List<InventoryMovement> findByCompany(Company company);

	@Query("SELECT MAX(mris.id) FROM InventoryMovement mris")
	Long getMaxId();

}
