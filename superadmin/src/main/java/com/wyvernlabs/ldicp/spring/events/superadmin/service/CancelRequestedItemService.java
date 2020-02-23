package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CancelRequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CancelRequestedItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseRequestRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.RequestedItemRepository;

@Service
public class CancelRequestedItemService {
	@Autowired
	private CancelRequestedItemRepository cancelRequestedItemRepository;
	@Autowired
	private RequestedItemRepository requestedItemRepository;
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepository;
	
	@Transactional
	public CancelRequestedItem cancelRequestedItem(CancelRequestedItem cancelRequestedItem) {
		RequestedItem reqItem = requestedItemRepository.findOne(cancelRequestedItem.getRequestedItem().getId());
		reqItem.setStatus("Cancelled");
		PurchaseRequest prf = purchaseRequestRepository.findByNumber(cancelRequestedItem.getRequestedItem().getPrfNumber());
		prf.setStatus("Cancelled");
		purchaseRequestRepository.save(prf);
		requestedItemRepository.save(reqItem);
		return cancelRequestedItemRepository.save(cancelRequestedItem);
	}
}
