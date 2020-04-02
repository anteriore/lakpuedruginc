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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivedItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ReceivingReceiptService;

@RestController
@RequestMapping("rest/receiving-receipts")
public class ReceivingReceiptRestController {
	private static final Logger logger = LoggerFactory.getLogger(ReceivingReceiptRestController.class);
	@Autowired
	private ReceivingReceiptRepository receivingReceiptRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private PurchaseOrderRepository purchaseOrderRepository;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private ReceivedItemRepository receivedItemRepository;
	@Autowired
	private ReceivingReceiptService receivingReceiptService;

	@GetMapping("/{id}")
	public ReceivingReceipt get(@PathVariable Long id) {
		return receivingReceiptRepository.getOne(id);
	}

	@GetMapping()
	public List<ReceivingReceipt> list() {
		return receivingReceiptRepository.findAll();
	}

	@PostMapping()
	public ReceivingReceipt upsert(@RequestBody ReceivingReceipt receivingReceipt) {
		return receivingReceiptService.saveReceivingReceipt(receivingReceipt);
	}

	@GetMapping("/company/{companyId}")
	public List<ReceivingReceipt> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return receivingReceiptRepository.findByCompany(company);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		receivingReceiptRepository.delete(id);
		return true;
	}

	@GetMapping("/company/{companyId}/po/{poId}")
	public List<ReceivingReceipt> listByCompanyAndPurchaseOrder(@PathVariable Long companyId, @PathVariable Long poId) {
		Company company = companyRepository.findOne(companyId);
		PurchaseOrder po = purchaseOrderRepository.findOne(poId);
		return receivingReceiptRepository.findByCompanyAndPurchaseOrder(company, po);

	}

	@GetMapping("/company/{companyId}/status/{status}")
	public List<ReceivingReceipt> listByStatus(@PathVariable String status, @PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return receivingReceiptRepository.findByCompanyAndStatus(company, status);
	}

	@GetMapping("/company/{companyId}/stock/{itemId}")
	public int getQuarantinedQuantityOfItem(@PathVariable Long companyId, @PathVariable Long itemId) {
		int sum = 0;
		Company company = companyRepository.findOne(companyId);

		List<ReceivingReceipt> receivingReceipts = receivingReceiptRepository.findByCompanyAndStatus(company,
				"Pending");

		for (ReceivingReceipt rr : receivingReceipts) {
			sum += rr.getQuantityOfItem(itemId);
		}

		return sum;
	}

	@GetMapping("/company/{companyId}/no-purchase-voucher")
	public List<ReceivingReceipt> ListRrWithoutPurchaseVoucher(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return receivingReceiptRepository.findByCompanyAndPurchaseVoucher(company, null);
	}
}
