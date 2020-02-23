package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialReevaluation;

public interface MaterialReevaluationRepository extends JpaRepository<MaterialReevaluation, Long> {

	List<MaterialReevaluation> findByCompany(Company company);

}
