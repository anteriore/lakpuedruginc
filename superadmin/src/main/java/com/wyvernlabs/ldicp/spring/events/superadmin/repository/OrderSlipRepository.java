package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Client;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesInvoice;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesSlip;

public interface OrderSlipRepository extends JpaRepository<OrderSlip, Long>{

	List<OrderSlip> findByCompany(Company company);

	List<OrderSlip> findByDepot(Depot depot);

	@Query(value = "SELECT os FROM OrderSlip os WHERE os.salesOrder.client = :client AND os.depot = :depot AND os.status IN :status")
	List<OrderSlip> findByDepotAndClientAndStatus(@Param("depot") Depot depot, @Param("client")  Client client, @Param("status")  String[] status);

	@Query(value = "SELECT os FROM OrderSlip os WHERE os.depot = :depot AND os.status IN :status")
	List<OrderSlip> findByDepotAndStatus(@Param("depot") Depot depot, @Param("status")  String[] status);

	@Query(value = "SELECT os FROM OrderSlip os WHERE os.depot = :depot AND os.date BETWEEN :startDate AND :endDate")
	List<OrderSlip> findByDepotBetweenDates(@Param("depot") Depot depot, @Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
