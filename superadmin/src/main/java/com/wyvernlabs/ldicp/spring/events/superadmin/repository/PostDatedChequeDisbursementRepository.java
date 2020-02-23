package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PostDatedChequeDisbursement;

public interface PostDatedChequeDisbursementRepository extends JpaRepository<PostDatedChequeDisbursement, Long> {

	List<PostDatedChequeDisbursement> findByStatus(String status);

	List<PostDatedChequeDisbursement> findByCompanyAndDateBetween(Company company, Date startDate, Date endDate);

}