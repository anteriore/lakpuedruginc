package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialIssuance;

public interface MaterialIssuanceRepository extends JpaRepository<MaterialIssuance, Long> {

	List<MaterialIssuance> findByCompany(Company company);

	List<MaterialIssuance> findByStatus(String status);

	@Query("SELECT MAX(mis.id) FROM MaterialIssuance mis")
	Long getMaxId();

}
