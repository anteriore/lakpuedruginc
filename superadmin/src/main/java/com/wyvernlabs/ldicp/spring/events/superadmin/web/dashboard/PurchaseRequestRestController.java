package com.wyvernlabs.ldicp.spring.events.superadmin.web.dashboard;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Department;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CancelRequestedItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepartmentRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseRequestRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.RequestedItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VendorRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.PurchaseRequestService;

@RestController
@RequestMapping("rest/purchase-requests")
public class PurchaseRequestRestController {
	private static final Logger logger = LoggerFactory.getLogger(PurchaseRequestRestController.class);
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private VendorRepository vendorRepository;
	@Autowired
	private PurchaseOrderRepository purchaseOrderRepository;
	@Autowired
	private PurchaseRequestService purchaseRequestService;
	@Autowired
	private RequestedItemRepository requestedItemRepository;
	@Autowired
	private CancelRequestedItemRepository cancelRequestedItemRepository;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private DepartmentRepository departmentRepository;

	@GetMapping("/{id}")
	public PurchaseRequest get(@PathVariable Long id) {
		return purchaseRequestRepository.getOne(id);
	}

	@GetMapping()
	public List<PurchaseRequest> list() {
		return purchaseRequestRepository.findAll();
	}

	@PostMapping()
	public PurchaseRequest upsert(@RequestBody PurchaseRequest purchaseRequest) {
		logger.info("upsert {}", purchaseRequest);
		return purchaseRequestService.savePurchaseRequest(purchaseRequest);
	}

	@GetMapping("/company/{companyId}")
	public Set<PurchaseRequest> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return purchaseRequestRepository.findByCompany(company);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		purchaseRequestRepository.deleteById(id);
		return true;
	}

	@PostMapping("/approve/{prfId}")
	public PurchaseRequest approvePurchaseRequest(@PathVariable Long prfId) {
		return purchaseRequestService.approvePurchaseRequest(prfId);
	}

	@PostMapping("/reject/{prfId}")
	public PurchaseRequest rejectPurchaseRequest(@PathVariable Long prfId) {
		PurchaseRequest purchaseRequest = purchaseRequestRepository.getOne(prfId);
		purchaseRequest.setStatus("Rejected");
		return purchaseRequestRepository.save(purchaseRequest);
	}

	@GetMapping("/company/{companyId}/stock/{itemId}")
	public int getPrfQuantityOfItem(@PathVariable Long companyId, @PathVariable Long itemId) {
		Company company = companyRepository.getOne(companyId);
		Item item = itemRepository.getOne(itemId);
		List<RequestedItem> requestedItems = purchaseRequestService
				.getNotCompletedRequestedItemsByCompanyAndItem(company, item);
		int sum = 0;
		for (RequestedItem requestedItem : requestedItems) {
			if (requestedItem.getStatus().equals("Pending")) {
				sum += requestedItem.getQuantityRequested();
			} else if (requestedItem.getStatus().equals("Incomplete")) {
				sum += requestedItem.getQuantityRemaining();
			}
		}
		return sum;
	}

	@GetMapping("/cancelled-reqs/{prfId}")
	public List<CancelRequestedItem> getCanceleldReqsOfPrf(@PathVariable Long prfId) {
		PurchaseRequest prf = purchaseRequestRepository.getOne(prfId);
		List<CancelRequestedItem> list = new ArrayList<CancelRequestedItem>();
		for (RequestedItem item : prf.getRequestedItems()) {
			if (item.getStatus().equals("Cancelled")) {
				list.add(cancelRequestedItemRepository.findLastByRequestedItem(item));
			}
		}
		return list;
	}

	@GetMapping("/company/{companyId}/department/{department}")
	public List<PurchaseRequest> getPurchaseRequestsByCompanyAndDepartment(@PathVariable Long companyId,
			@PathVariable String department) {
		Company company = companyRepository.getOne(companyId);
		Department d = departmentRepository.findByName(department);
		return purchaseRequestRepository.findByCompanyAndDepartment(company, d);
	}

	@GetMapping("/company/{companyId}/status/{status}")
	public Set<PurchaseRequest> getPurchaseRequestsByCompanyAndStatus(@PathVariable Long companyId,
			@PathVariable String status) {
		Company company = companyRepository.getOne(companyId);
		return purchaseRequestRepository.findByCompanyAndStatus(company, status);
	}

}
