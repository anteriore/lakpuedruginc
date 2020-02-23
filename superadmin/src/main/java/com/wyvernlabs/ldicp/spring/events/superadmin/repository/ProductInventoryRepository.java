package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;

public interface ProductInventoryRepository extends JpaRepository<ProductInventory, Long> {

	ProductInventory findByProduct(Product product);

	List<ProductInventory> findByDepot(Depot depot);
	
	ProductInventory findByProductAndDepot(Product product, Depot depot);
	
	ProductInventory findByProductAndDepotAndCompany(Product product, Depot depot, Company company);

	@Query(value = "SELECT SUM(iv.quantity) AS sum, p.finishedGood AS finishedGood, p AS product FROM ProductInventory iv"
			+ " JOIN iv.product p WHERE iv.company = :company GROUP BY p.finishedGood.id")
	List<Map<String, Object>> findSumQuantityByCompanyGroupByFinishedGood(@Param("company") Company company);
	
	@Query(value = "SELECT SUM(iv.quantity) AS sum, p.finishedGood AS finishedGood FROM ProductInventory iv"
			+ " JOIN iv.product p WHERE iv.company = :company GROUP BY p.finishedGood.id")
	List<Map<String, Object>> findSumQuantityByCompanyGroupByFinishedGoodId(@Param("company") Company company);
	
	
	@Query(value = "SELECT SUM(iv.quantity) AS sum, p.finishedGood AS finishedgood, p AS product FROM ProductInventory iv"
			+ " JOIN iv.product p WHERE iv.company = :company AND iv.depot = :depot GROUP BY p.finishedGood.id")
	List<Map<String, Object>> findSumQuantityByCompanyAndDepotGroupByFinishedGood(@Param("company") Company company, @Param("depot") Depot depot);
	
	
	@Query(value = "SELECT iv FROM ProductInventory iv JOIN iv.product p WHERE iv.company = :company AND p.finishedGood = :finishedGood")
	List<ProductInventory> findByCompanyAndFinishedGood(@Param("company") Company company, @Param("finishedGood") FinishedGood finishedGood);

	@Query(value = "SELECT iv FROM ProductInventory iv JOIN iv.product p WHERE iv.depot = :depot AND p.finishedGood = :finishedGood")
	List<ProductInventory> findByDepotAndFinishedGood(@Param("depot") Depot depot, @Param("finishedGood") FinishedGood finishedGood);

	List<ProductInventory> findByCompany(Company company);
}
