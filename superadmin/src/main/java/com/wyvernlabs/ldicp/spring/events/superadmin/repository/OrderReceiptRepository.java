package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderReceipt;

public interface OrderReceiptRepository extends JpaRepository<OrderReceipt, Long>{

	List<OrderReceipt> findByDepot(Depot depot);

}
