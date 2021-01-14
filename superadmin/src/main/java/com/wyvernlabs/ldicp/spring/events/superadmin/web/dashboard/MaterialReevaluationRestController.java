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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialReevaluation;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ApprovedReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MaterialReevaluationRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseRequestRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.MaterialReevaluationService;

@RestController
@RequestMapping("rest/material-reevaluations")
public class MaterialReevaluationRestController {
	private static final Logger logger = LoggerFactory.getLogger(MaterialReevaluationRestController.class);

	@Autowired
	private MaterialReevaluationRepository materialReevaluationRepository;
	@Autowired
	private ApprovedReceiptRepository approvedReceiptRepository;
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private MaterialReevaluationService materialReevaluationService;

	@GetMapping("/{id}")
	public MaterialReevaluation get(@PathVariable Long id) {
		return materialReevaluationRepository.getOne(id);
	}

	@GetMapping()
	public List<MaterialReevaluation> list() {
		return materialReevaluationRepository.findAll();
	}

	@PostMapping()
	public MaterialReevaluation upsert(@RequestBody MaterialReevaluation materialEvaluation) {
		return materialReevaluationService.save(materialEvaluation);
	}

	@GetMapping("/company/{companyId}")
	public List<MaterialReevaluation> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return materialReevaluationRepository.findByCompany(company);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		materialReevaluationRepository.deleteById(id);
		return true;
	}
}
