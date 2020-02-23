package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;

public interface InventoryRepository extends JpaRepository<Inventory, Long> {

	List<Inventory> findByCompanyOrderByDateCreatedDesc(Company company);
	Inventory findByControlNumberAndCompany(String controlNumber, Company company);
	List<Inventory> findByItemAndCompany(Item item, Company company);
	
	@Query(value = "SELECT SUM(iv.quantity) AS sum, i AS item FROM Inventory iv"
			+ " JOIN iv.item i WHERE iv.company = :company GROUP BY i.id")
	List<Inventory> findSumQuantityByCompanyGroupByItem(@Param("company") Company company);
	List<Inventory> findByCompanyAndItemOrderByDateCreatedDesc(Company company, Item item);
	List<Inventory> findByControlNumber(String controlNumber);

}
