package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseRequestRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.RequestedItemRepository;

@Component
@Transactional
public class PurchaseRequestService {
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepository;
	@Autowired
	private RequestedItemRepository requestedItemRepository;

	@Transactional
	public PurchaseRequest savePurchaseRequest(PurchaseRequest prf) {
		Long id = purchaseRequestRepository.getMaxId();
		prf.setStatus("Pending");
		if (id == null) {
			prf.setNumber("PRF-0");
		} else {
			prf.setNumber("PRF-" + ++id);
		}

		for (RequestedItem item : prf.getRequestedItems()) {
			item.setPrfNumber(prf.getNumber());
			item.setCompany(prf.getCompany());
			item.setStatus("Pending");
		}

		return purchaseRequestRepository.save(prf);
	}

	public List<RequestedItem> getNotCompletedRequestedItemsByCompanyAndItem(Company company, Item item) {
		return requestedItemRepository.findByStatusNotAndCompanyAndItem("PO Created", company, item);
	}

	public List<RequestedItem> getNotCompletedRequestedItemsByCompany(Company company) {
		return requestedItemRepository.findByStatusNotAndCompany("PO Created", company);
	}

	public PurchaseRequest approvePurchaseRequest(Long prfId) {
		PurchaseRequest prf = purchaseRequestRepository.getOne(prfId);
		prf.setStatus("Approved");
		return purchaseRequestRepository.save(prf);
	}

	public List<RequestedItem> getNotCompletedRequestedItemsByCompanyAndType(Company company, ItemType itemType) {
		List<RequestedItem> requestedItems = requestedItemRepository.findByStatusNotAndCompany("PO Created", company);
		return requestedItems.stream().filter(i -> itemType.getCode().equals(i.getItem().getType().getCode()))
				.collect(Collectors.toList());
	}
}
