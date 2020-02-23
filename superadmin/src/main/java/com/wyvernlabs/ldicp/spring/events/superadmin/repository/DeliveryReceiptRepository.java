package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.DeliveryReceipt;

public interface DeliveryReceiptRepository extends JpaRepository<DeliveryReceipt, Long> {

	List<DeliveryReceipt> findByCompany(Company company);

}
