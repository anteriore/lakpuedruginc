package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Area;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Department;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AreaRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepartmentRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseRequestRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VendorRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.PurchaseOrderService;

@Component
public class PurchaseOrderData {
	@Autowired
	private PurchaseOrderRepository purchaseOrderRepository;
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private DepartmentRepository departmentRepository;
	@Autowired
	private VendorRepository vendorRepository;
	@Autowired
	private AreaRepository areaRepository;
	@Autowired
	private PurchaseOrderService purchaseOrderService;
	


	public void init() {
		PurchaseOrder po1 = new PurchaseOrder();
		Vendor v1 = vendorRepository.getOne(1L);
		Department d1 = departmentRepository.getOne(1L);
		Area a1 = areaRepository.getOne(1L);
		Company c1 = companyRepository.getOne(1L);
		Set<PurchaseRequest> purchaseRequests = purchaseRequestRepository.findByCompany(c1);

		po1.setArea(a1);
		po1.setCompany(c1);
		po1.setCurrency("1");
		po1.setDeliverTo("John Operio 1");
		po1.setDepartment(d1);
		po1.setDueDate(new Date());
		po1.setJobOrderNo("");
		po1.setDate(new Date());
		po1.setTerms("Cash");
		po1.setRemarks("Remarks");
		po1.setVat(false);
		po1.setVendor(v1);
		Double sum = 0D;
		Set<OrderedItem> orderedItems = new HashSet<OrderedItem>();
		for(PurchaseRequest pr : purchaseRequests) {
			for(RequestedItem requestedItem : pr.getRequestedItems()) {
				OrderedItem orderedItem = new OrderedItem();
				orderedItem.setItem(requestedItem.getItem());
				orderedItem.setPoNumber(po1.getNumber());
				orderedItem.setPrfNumber(pr.getNumber());
				orderedItem.setQuantity(requestedItem.getQuantityRequested());
				orderedItem.setUnitPrice(50D);
				orderedItem.setAmount(orderedItem.getQuantity() * orderedItem.getUnitPrice());
				orderedItem.setUnit(requestedItem.getUnit());
				orderedItem.setRequestedItemId(requestedItem.getId());
				sum += orderedItem.getAmount();
				orderedItems.add(orderedItem);
			}
		}
		po1.setOrderedItems(orderedItems);
		po1.setTotalAmount(sum);
		purchaseOrderService.savePurchaseOrder(po1);

		/*
		Company c2 = companyRepository.getOne(2L);
		List<PurchaseRequest> purchaseRequests2 = purchaseRequestRepository.findByCompany(c2);

		PurchaseOrder po2 = new PurchaseOrder();
		po2.setArea(a1);
		po2.setCompany(c2);
		po2.setCurrency("1");
		po2.setDeliverTo("John Operio 2");
		po2.setDepartment(d1);
		po2.setDueDate(new Date());
		po2.setJobOrderNo("");
		po2.setNumber("0002");

		po2.setPurchaseRequests(purchaseRequests2);
		po2.setTerms("Cash");
		po2.setRemarks("Remarks");
		po2.setVat(false);
		po2.setVendor(v1);
		po2.setTotalAmount(sum);
		purchaseOrderRepository.save(po2);
		savePurchaseRequest(purchaseRequests2, po2);*/

		


	}
}
