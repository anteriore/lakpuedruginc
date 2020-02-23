package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ApprovedReceipt.ApprovedReceipt;

public interface ApprovedReceiptRepository extends JpaRepository<ApprovedReceipt, Long> {
	List<ApprovedReceipt> findByCompany(Company company);

	ApprovedReceipt findByNumber(String arNumber);

	ApprovedReceipt findByControlNumber(String controlNumber);
	
	List<ApprovedReceipt> findByItem(Item item);

	List<ApprovedReceipt> findByItemAndCompany(Item item, Company company);

	@Query("SELECT MAX(ar.id) FROM ApprovedReceipt ar")
	Long getMaxId();
}
