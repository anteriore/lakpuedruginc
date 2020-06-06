package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Department;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Unit;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepartmentRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UnitRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.PurchaseRequestService;

@Component
public class PurchaseRequestData {
	@Autowired
	private PurchaseRequestService purchaseRequestService;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UnitRepository unitRepository;
	@Autowired
	private DepartmentRepository departmentRepository;

	@Transactional
	public void init() {
		PurchaseRequest pr1 = new PurchaseRequest();
		Company c1 = companyRepository.getOne(1L);
		User u1 = userRepository.getOne(1L);
		Department department = departmentRepository.getOne(1L);
		pr1.setCompany(c1);
		pr1.setDate(new Date());
		pr1.setDateNeeded(new Date());
		pr1.setRemarks("remarks");
		pr1.setRequestedBy(u1);

		Set<RequestedItem> items = new HashSet<RequestedItem>();
		RequestedItem requestedItem1 = new RequestedItem();
		Item i1 = itemRepository.getOne(1L);
		Unit kg = unitRepository.findByCode("kg");

		requestedItem1.setItem(i1);
		requestedItem1.setMoqQuantity(20);
		requestedItem1.setUnit(kg);
		requestedItem1.setQuantityRequired(1000);
		requestedItem1.setQuantityRequested(1000);

		items.add(requestedItem1);

		RequestedItem requestedItem2 = new RequestedItem();
		Item i2 = itemRepository.getOne(2L);
		Unit pc = unitRepository.findByCode("pc");
		requestedItem2.setItem(i2);
		requestedItem2.setMoqQuantity(25);
		requestedItem2.setQuantityRequired(1138);
		requestedItem2.setQuantityRequested(1150);
		requestedItem2.setUnit(pc);

		items.add(requestedItem2);

		pr1.setRequestedItems(items);
		purchaseRequestService.savePurchaseRequest(pr1);
		purchaseRequestService.approvePurchaseRequest(pr1.getId());
	}
}
