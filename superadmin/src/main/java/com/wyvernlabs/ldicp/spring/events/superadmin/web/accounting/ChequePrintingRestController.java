package com.wyvernlabs.ldicp.spring.events.superadmin.web.accounting;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ChequePrinting;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ChequePrintingRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ChequePrintingService;

@RestController
@RequestMapping("rest/cheque-printings")
public class ChequePrintingRestController {
	private static final Logger logger = LoggerFactory.getLogger(ChequePrintingRestController.class);
	@Autowired
	private ChequePrintingRepository chequePrintingRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private ChequePrintingService chequePrintingService;

	@GetMapping("/{id}")
	public ChequePrinting get(@PathVariable Long id) {
		return chequePrintingRepository.getOne(id);
	}

	@GetMapping()
	public List<ChequePrinting> list() {
		return chequePrintingRepository.findAll();
	}

	@GetMapping("/company/{companyId}")
	public List<ChequePrinting> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return chequePrintingRepository.findByCompany(company);
	}

	@GetMapping("/company/{companyId}/status/{status}")
	public List<ChequePrinting> listByCompanyAndStatus(@PathVariable Long companyId, @PathVariable String status) {
		Company company = companyRepository.getOne(companyId);
		return chequePrintingRepository.findByCompanyAndStatus(company, status);
	}

	@PostMapping()
	public ChequePrinting upsert(@RequestBody ChequePrinting chequePrinting) {
		return chequePrintingService.saveChequePrinting(chequePrinting);
	}

	@PostMapping("/approve/{cpId}/user/{userId}")
	public ChequePrinting approve(@PathVariable Long cpId, @PathVariable Long userId) {
		return chequePrintingService.approve(cpId, userId);
	}

	@PostMapping("/reject/{cpId}/user/{userId}")
	public ChequePrinting reject(@PathVariable Long cpId, @PathVariable Long userId) {
		return chequePrintingService.reject(cpId, userId);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		chequePrintingRepository.deleteById(id);
		return true;
	}
}
