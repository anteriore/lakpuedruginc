package com.wyvernlabs.ldicp.spring.events.superadmin.web.dashboard;

import java.util.List;

import javax.transaction.Transactional;

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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ApprovedReceipt.ApprovedReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ApprovedReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UnitRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ApprovedReceiptService;

@RestController
@RequestMapping("rest/approved-receipts")
public class ApprovedReceiptRestController {
	private static final Logger logger = LoggerFactory.getLogger(ApprovedReceiptRestController.class);

	@Autowired
	private ApprovedReceiptRepository approvedReceiptRepository;
	@Autowired
	ReceivingReceiptRepository receivingReceiptRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private InventoryRepository inventoryRepository;
	@Autowired
	private ApprovedReceiptService approvedReceiptService;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private UnitRepository unitRepository;

	@GetMapping("/{id}")
	public ApprovedReceipt get(@PathVariable Long id) {
		return approvedReceiptRepository.getOne(id);
	}

	@GetMapping()
	public List<ApprovedReceipt> list() {
		return approvedReceiptRepository.findAll();
	}

	@PostMapping()
	@Transactional
	public ApprovedReceipt upsert(@RequestBody ApprovedReceipt ar) {
		logger.info("upsert: " + ar.toString());

		return approvedReceiptService.save(ar);
	}

	@GetMapping("/company/{companyId}")
	public List<ApprovedReceipt> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return approvedReceiptRepository.findByCompany(company);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		approvedReceiptRepository.deleteById(id);
		return true;
	}

	@GetMapping("/number/{arNumber}")
	public ApprovedReceipt findByArNumber(@PathVariable String arNumber) {
		ApprovedReceipt ar = approvedReceiptRepository.findByNumber(arNumber);
		return ar;
	}

	@GetMapping("/control-number/{controlNumber}")
	public ApprovedReceipt findByControlNumber(@PathVariable String controlNumber) {
		return approvedReceiptRepository.findByControlNumber(controlNumber);
	}

}
