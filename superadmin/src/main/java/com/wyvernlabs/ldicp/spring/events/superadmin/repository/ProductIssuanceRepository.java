package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductIssuance;

public interface ProductIssuanceRepository extends JpaRepository<ProductIssuance, Long>{

	List<ProductIssuance> findByCompany(Company company);

	List<ProductIssuance> findByStatus(String status);
	
	List<ProductIssuance> findByStatusAndToDepot(String status, Depot depot);

	@Query("SELECT MAX(fgis.id) FROM ProductIssuance fgis")
	Long getMaxId();

}
