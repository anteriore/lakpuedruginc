package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.PurchaseOrderService;

@RestController
@RequestMapping("rest/purchase-orders")
public class PurchaseOrderRestController {
	private static final Logger logger = LoggerFactory.getLogger(PurchaseOrderRestController.class);
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private PurchaseOrderRepository purchaseOrderRepository;
	@Autowired
	private PurchaseOrderService purchaseOrderService;
	@GetMapping("/{id}")
	public PurchaseOrder get(@PathVariable Long id) {
		return purchaseOrderRepository.getOne(id);
	}

	@GetMapping()
	public List<PurchaseOrder> list() {
		return purchaseOrderRepository.findAll();
	}

	@PostMapping()
	public PurchaseOrder upsert(@RequestBody PurchaseOrder purchaseOrder) {
		return purchaseOrderService.savePurchaseOrder(purchaseOrder);
	}

	@GetMapping("/company/{companyId}")
	public List<PurchaseOrder> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return purchaseOrderRepository.findByCompany(company);
	}
	
	@GetMapping("/company/{companyId}/not-completed")
	public List<PurchaseOrder> listNotCompletedByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return purchaseOrderRepository.findByCompanyAndStatusNot(company, "Completed");
	}
	
	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		purchaseOrderRepository.delete(id);
		return true;
	}
	
	@GetMapping("/company/{companyId}/stock/{itemId}")
	public int getPurchaseOrderQuantityByItem(@PathVariable Long companyId, @PathVariable Long itemId) {
		Company company = companyRepository.findOne(companyId);
		List<PurchaseOrder> purchaseOrders = purchaseOrderRepository.findByCompanyAndStatus(company, "PO Created");
		int sum = 0;
		for(PurchaseOrder purchaseOrder : purchaseOrders) {
			for(OrderedItem orderedItem : purchaseOrder.getOrderedItems()) {
				sum += orderedItem.getQuantity();
			}
		}
		
		return sum;
	}
	
	@GetMapping("/number/{poNumber}")
	public PurchaseOrder getPurchaseOrderByNumber(@PathVariable String poNumber) {
		return purchaseOrderRepository.findByNumber(poNumber);
	}

}
