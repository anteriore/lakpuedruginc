package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseRequestRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.RequestedItemRepository;

@Component
public class PurchaseOrderService {
	@Autowired
	private PurchaseOrderRepository purchaseOrderRepository;
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepository;
	@Autowired
	private RequestedItemRepository requestedItemRepository;

	@Transactional
	public PurchaseOrder savePurchaseOrder(PurchaseOrder purchaseOrder) {
		Set<OrderedItem> orderedItems = purchaseOrder.getOrderedItems();
		Long id = purchaseOrderRepository.getMaxId();
		if (id == null) {
			id = 0L;
		}

		purchaseOrder.setNumber("PO-" + ++id);
		for (OrderedItem orderedItem : orderedItems) {
			orderedItem.setPoNumber(purchaseOrder.getNumber());
			RequestedItem requestedItem = requestedItemRepository.getOne(orderedItem.getRequestedItemId());
			PurchaseRequest purchaseRequest = purchaseRequestRepository.findByNumber(requestedItem.getPrfNumber());
			requestedItem.deductQuantityRequestedFromQuantity(orderedItem);
			if(!purchaseRequest.getStatus().equals("PO Created")){
				purchaseRequest.setStatus("PO Created");
			}
		}
		PurchaseOrder po = purchaseOrderRepository.save(purchaseOrder);
		return po;
	}
}
