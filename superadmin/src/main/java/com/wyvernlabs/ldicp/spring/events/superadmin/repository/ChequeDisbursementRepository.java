package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ChequeDisbursement;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;

public interface ChequeDisbursementRepository extends JpaRepository<ChequeDisbursement, Long>{

	List<ChequeDisbursement> findByCompany(Company company);

}
