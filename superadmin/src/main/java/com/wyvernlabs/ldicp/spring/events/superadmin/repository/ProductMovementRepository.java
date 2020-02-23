package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductMovement;

public interface ProductMovementRepository extends JpaRepository<ProductMovement, Long>{

	List<ProductMovement> findByCompany(Company company);

	@Query("SELECT MAX(fgris.id) FROM ProductMovement fgris")
	Long getMaxId();

}
