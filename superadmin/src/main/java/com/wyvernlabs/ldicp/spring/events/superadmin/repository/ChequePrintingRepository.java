package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ChequePrinting;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;

public interface ChequePrintingRepository extends JpaRepository<ChequePrinting, Long> {

	List<ChequePrinting> findByCompany(Company company);

	@Query("SELECT MAX(cp.id) FROM ChequePrinting cp WHERE cp.status = :status")
	Long getMaxIdByStatus(@Param("status") String status);

	List<ChequePrinting> findByCompanyAndStatus(Company company, String status);
}
