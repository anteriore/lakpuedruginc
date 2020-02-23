package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CancelSalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesRep;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.OrderSlipType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CancelSalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesRepRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.SalesOrderService;

@RestController
@RequestMapping("rest/sales-orders")
public class SalesOrderRestController {
	@Autowired
	private SalesOrderService salesOrderService;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private SalesOrderRepository salesOrderRepository;
	@Autowired
	private CancelSalesOrderProductRepository cancelSalesOrderProductRepository;
	@Autowired
	private SalesOrderProductRepository salesOrderProductRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private SalesRepRepository salesRepRepository;
	
	@GetMapping("/{id}")
	public SalesOrder get(@PathVariable Long id) {
		return salesOrderRepository.getOne(id);
	}
	
	@GetMapping()
	public List<SalesOrder> list() {
		return salesOrderRepository.findAll();
	}

	@PostMapping()
	public SalesOrder upsert(@RequestBody SalesOrder salesOrder) {
		return salesOrderService.saveSalesOrder(salesOrder);
	}

	@GetMapping("/company/{companyId}")
	public List<SalesOrder> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return salesOrderRepository.findByCompany(company);
	}
	
	@GetMapping("/depot/{depotId}")
	public List<SalesOrder> listByDepot(@PathVariable Long depotId) {
		Depot depot = depotRepository.findOne(depotId);
		return salesOrderRepository.findByDepot(depot);
	}
	
	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		salesOrderRepository.delete(id);
		return true;
	}
	
	@PostMapping("/approve/{prfId}")
	public SalesOrder approveSalesOrder(@PathVariable Long prfId) {
		SalesOrder salesOrder = salesOrderRepository.findOne(prfId);
		salesOrder.setStatus("Approved");
		return salesOrderRepository.save(salesOrder);
	}
	
	@PostMapping("/reject/{prfId}")
	public SalesOrder rejectSalesOrder(@PathVariable Long prfId) {
		SalesOrder salesOrder = salesOrderRepository.findOne(prfId);
		salesOrder.setStatus("Rejected");
		return salesOrderRepository.save(salesOrder);
	}
	
	@GetMapping("/cancelled-reqs/{soId}")
	public List<CancelSalesOrderProduct> getCanceleldReqsOfSO(@PathVariable Long soId){
		SalesOrder so = salesOrderRepository.findOne(soId);
		List<CancelSalesOrderProduct> list = new ArrayList<CancelSalesOrderProduct>();
		for(SalesOrderProduct product : so.getProducts()) {
			if(product.getStatus().equals("Cancelled")) {
				list.add(cancelSalesOrderProductRepository.findLastBySalesOrderProduct(product));
			}
		}
		return list;
	}
	
	@GetMapping("/company/{companyId}/depot/{depotId}/type/{type}")
	public List<SalesOrder> listNotCompletedByCompanyAndDepot(@PathVariable Long companyId, @PathVariable Long depotId, @PathVariable OrderSlipType type) {
		Company company = companyRepository.findOne(companyId);
		Depot depot = depotRepository.findOne(depotId);
		String[] status = {"Approved", "Incomplete"};
		return salesOrderRepository.findByCompanyAndDepotAndStatusInAndType(company, depot, status, type);
	}
	
	@GetMapping("/general-sales-report/depot/{depotId}/start/{startDate}/end/{endDate}/sales-rep/{salesRepId}")
	public Map<String, Object> getTotalAmountAndQuantity(@PathVariable Long depotId, @PathVariable Date startDate, @PathVariable Date endDate, @PathVariable Long salesRepId){
		SalesRep salesRep = salesRepRepository.findOne(salesRepId);
		Depot depot = depotRepository.findOne(depotId);
		String[] status = {"Completed", "In Transit", "Incomplete"};
		List<SalesOrder> salesOrders = salesOrderRepository.findByDepotAndStatusInAndDateBetween(depot, status, startDate, endDate);
		Double totalAmount = salesOrders.stream().filter(so -> so.getClient().getSalesRep() == salesRep).mapToDouble(so -> so.getTotalAmount()).sum();
		int totalQuantity = salesOrders.stream().filter(so -> so.getClient().getSalesRep() == salesRep).mapToInt(so -> so.getTotalQuantity()).sum();
		Map map = new HashMap();
		map.put("gsrAmount", totalAmount);
		map.put("gsrQuantity", totalQuantity);
		return map;
	}
}
