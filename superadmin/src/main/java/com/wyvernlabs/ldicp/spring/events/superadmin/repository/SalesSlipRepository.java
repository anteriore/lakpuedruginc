package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesSlip;

public interface SalesSlipRepository extends JpaRepository<SalesSlip, Long>{

	List<SalesSlip> findByDepot(Depot depot);

	List<SalesSlip> findByDepotAndDateBetween(Depot depot, Date startDate, Date endDate);


}
