package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Client;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesInvoice;
import java.util.Date;
public interface SalesInvoiceRepository extends JpaRepository<SalesInvoice, Long> {

	List<SalesInvoice> findByCompany(Company company);

	List<SalesInvoice> findByDepot(Depot depot);
	
	@Query(value = "SELECT si FROM SalesInvoice si WHERE si.salesOrder.client = :client AND si.depot = :depot AND si.status IN :status")
	List<SalesInvoice> findByDepotAndClientAndStatus(@Param("depot") Depot depot, @Param("client")  Client client, @Param("status")  String[] status);

	@Query(value = "SELECT si FROM SalesInvoice si WHERE si.depot = :depot AND si.status IN :status")
	List<SalesInvoice> findByDepotAndStatus(@Param("depot") Depot depot, @Param("status")  String[] status);
	
	@Query(value = "SELECT si FROM SalesInvoice si WHERE si.depot = :depot AND si.date BETWEEN :startDate AND :endDate")
	List<SalesInvoice> findByDepotBetweenDates(@Param("depot") Depot depot, @Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
