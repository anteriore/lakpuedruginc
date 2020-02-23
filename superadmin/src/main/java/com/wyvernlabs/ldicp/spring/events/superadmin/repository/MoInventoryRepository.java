package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MoInventoryRepository extends JpaRepository<MoInventory, Long> {

	List<MoInventory> findByFinishedGood(FinishedGood finishedGood);
	List<MoInventory> findByCompany(Company company);

	@Query(value = "SELECT * FROM mo_inventory m WHERE m.lot_number != -1 ORDER BY id desc LIMIT 1", nativeQuery = true)
	MoInventory getLastMoInventory();

	@Query(value = "SELECT m FROM MoInventory m WHERE m.lotNumber IS NULL and m.company = :company")
	List<MoInventory> findByNonLotNumber(@Param("company") Company company);

	@Query(value = "SELECT m FROM MoInventory m WHERE m.remainingBatchSize != 0 and m.company = :company")
	List<MoInventory> findByNonZeroRemainingBatchSize(@Param("company") Company company);
}
