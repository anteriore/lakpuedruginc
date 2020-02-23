package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;

public interface ReceivingReceiptRepository extends JpaRepository<ReceivingReceipt, Long> {
	List<ReceivingReceipt> findByCompany(Company company);

	List<ReceivingReceipt> findByCompanyAndPurchaseOrder(Company company, PurchaseOrder po);

	List<ReceivingReceipt> findByCompanyAndStatus(Company company, String status);

	@Query("SELECT MAX(rr.id) FROM ReceivingReceipt rr")
	Long getMaxId();

	List<ReceivingReceipt> findByCompanyAndPurchaseVoucher(Company company, PurchaseVoucher purchaseVoucher);

	ReceivingReceipt findByCompanyAndNumber(Company company, String rrNumber);
}
