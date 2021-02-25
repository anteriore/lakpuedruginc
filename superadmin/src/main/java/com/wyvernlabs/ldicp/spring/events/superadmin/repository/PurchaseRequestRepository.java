package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Department;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseRequest;

public interface PurchaseRequestRepository extends JpaRepository<PurchaseRequest, Long> {

	Set<PurchaseRequest> findByCompany(Company company);

	PurchaseRequest findByNumber(String prfNumber);

	PurchaseRequest getOne(Long id);

	Set<PurchaseRequest> findByCompanyAndStatusNot(Company company, String string);

	Set<PurchaseRequest> findByCompanyAndStatus(Company company, String string);

	Set<PurchaseRequest> findByCompanyAndDepartmentAndStatus(Company company, Department d, String string);

	List<PurchaseRequest> findByCompanyAndDepartment(Company company, Department d);

	@Query("SELECT MAX(prf.id) FROM PurchaseRequest prf")
	public Long getMaxId();
}
