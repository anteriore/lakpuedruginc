package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.OrderSlipType;

public interface SalesOrderRepository extends JpaRepository<SalesOrder, Long>{

	List<SalesOrder> findByCompany(Company company);

	SalesOrder findByNumber(String soNumber);

	List<SalesOrder> findByCompanyAndStatusNot(Company company, String string);

	List<SalesOrder> findByCompanyAndStatusAndType(Company company, String string, OrderSlipType type);

	List<SalesOrder> findByCompanyAndDepotAndStatusAndType(Company company, Depot depot, String string,
			OrderSlipType type);

	List<SalesOrder> findByCompanyAndDepotAndStatusInAndType(Company company, Depot depot, String[] status,
			OrderSlipType type);

	List<SalesOrder> findByDepot(Depot depot);
	
	List<SalesOrder> findByDepotAndStatusInAndDateBetween(Depot depot, String[] status, Date startDate, Date endDate);


	@Query("SELECT MAX(so.id) FROM SalesOrder so")
	public Long getMaxId();

	//@Query("SELECT MAX(prf.id) FROM PurchaseRequest prf")
	//public Long getMaxId();

	//public List<Item> findByProductId(Long id);
}
