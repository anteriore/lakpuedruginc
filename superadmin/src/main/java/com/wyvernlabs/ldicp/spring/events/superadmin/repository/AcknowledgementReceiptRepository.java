package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AcknowledgementReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;

public interface AcknowledgementReceiptRepository extends JpaRepository<AcknowledgementReceipt, Long> {

	List<AcknowledgementReceipt> findByCompany(Company company);

	List<AcknowledgementReceipt> findByDepot(Depot depot);
	

}
