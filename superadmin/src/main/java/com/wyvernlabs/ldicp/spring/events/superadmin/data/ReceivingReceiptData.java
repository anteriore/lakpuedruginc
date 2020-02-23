package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.*;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ReceivingReceiptService;

@Component
public class ReceivingReceiptData {
	@Autowired
	private ReceivingReceiptRepository receivingReceiptRepository;
	@Autowired
	private PurchaseOrderRepository purchaseOrderRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private UserRepository userRepository;	
	@Autowired
	private ReceivingReceiptService receivingReceiptService;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private UnitRepository unitRepository;
	public void init() {
		Company c2 = companyRepository.findOne(1L);
		PurchaseOrder po1 = purchaseOrderRepository.findOne(1L);
		User u1 = userRepository.findOne(1L);
		List<ReceivedItem> receivedItems = new ArrayList<ReceivedItem>();
		ReceivingReceipt rr1 = new ReceivingReceipt();
		
		rr1.setCompany(c2);
		rr1.setDate(new Date());
		rr1.setDeliveryType("Complete");
		rr1.setDrNumber("DR12345");
		rr1.setPurchaseOrder(po1);
		rr1.setReceivedBy(u1);
		int a = 0;
		for(OrderedItem orderedItem : po1.getOrderedItems()) {
				ReceivedItem item = new ReceivedItem();
				item.setQuantity(orderedItem.getQuantity());
				item.setUnit(orderedItem.getUnit());
				item.setItem(orderedItem.getItem());
				receivedItems.add(item);
		}
		rr1.setReceivedItems(receivedItems);
		rr1.setSiNumber("SI12345");
		rr1.setRemarks("remarks");
		rr1.setOrigin("Unknown");
		
		receivingReceiptService.saveReceivingReceipt(rr1);
		

		// RR TOlling
		ReceivingReceipt rr2 = new ReceivingReceipt();

		rr2.setNumber("12345");
		rr2.setCompany(c2);
		rr2.setDate(new Date());
		rr2.setDeliveryType("Complete");
		rr2.setDrNumber("DR12345");
		//rr1.setPurchaseOrder(po1);
		rr2.setReceivedBy(u1);


		ReceivedItem item = new ReceivedItem();
		item.setQuantity(10);
		item.setUnit(unitRepository.getOne(1L));
		item.setItem(itemRepository.getOne(1L));
		receivedItems.add(item);
		rr2.setReceivedItems(receivedItems);
		rr2.setSiNumber("PRF SIZE "+ a);
		rr2.setRemarks("remarks");
		rr2.setOrigin("Unknown");
		rr2.setTolling(true);

	}
	
	
}
