package com.wyvernlabs.ldicp.spring.events.superadmin.web.dashboard;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CancelRequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemTypeRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseRequestRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.CancelRequestedItemService;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.PurchaseRequestService;

@RestController
@RequestMapping("api/requested-items")
public class RequestedItemRestController {
	private static final Logger logger = LoggerFactory.getLogger(RequestedItemRestController.class);
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private PurchaseRequestService purchaseRequestService;
	@Autowired
	private CancelRequestedItemService cancelRequestedItemService;
	@Autowired
	private ItemTypeRepository itemTypeRepository;

	@GetMapping("/company/{companyId}")
	public List<RequestedItem> listByCompany(@PathVariable Long companyId) {
		return purchaseRequestService.getNotCompletedRequestedItemsByCompany(companyRepository.getOne(companyId));
	}

	@GetMapping("/company/{companyId}/type/{type}")
	public List<RequestedItem> listByCompany(@PathVariable Long companyId, @PathVariable String type) {
		List<ItemType> itemTypes = itemTypeRepository.findByCode(type);
		return purchaseRequestService.getNotCompletedRequestedItemsByCompanyAndType(companyRepository.getOne(companyId),
				itemTypes.get(0));
	}

	@PostMapping("/cancel")
	public CancelRequestedItem cancelRequestedItem(@RequestBody CancelRequestedItem cancelRequestedItem) {
		return cancelRequestedItemService.cancelRequestedItem(cancelRequestedItem);
	}
}
