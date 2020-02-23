package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReturnSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;

public interface ReturnSlipRepository extends JpaRepository<ReturnSlip, Long>{

	List<ReturnSlip> findByDepot(Depot depot);

	List<ReturnSlip> findByDepotAndDateBetween(Depot depot, Date startDate, Date endDate);

}
