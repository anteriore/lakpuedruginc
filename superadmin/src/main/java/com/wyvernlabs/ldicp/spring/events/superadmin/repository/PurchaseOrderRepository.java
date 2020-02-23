package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {

	List<PurchaseOrder> findByCompany(Company company);

	PurchaseOrder findByNumber(String poNumber);
	
	List<PurchaseOrder> findByCompanyAndStatus(Company company, String status);

	List<PurchaseOrder> findByCompanyAndStatusNot(Company company, String status);

	@Query("SELECT MAX(po.id) FROM PurchaseOrder po")
	Long getMaxId();

}
