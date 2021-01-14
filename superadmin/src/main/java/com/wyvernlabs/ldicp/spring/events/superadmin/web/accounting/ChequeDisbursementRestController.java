package com.wyvernlabs.ldicp.spring.events.superadmin.web.accounting;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ChequeDisbursement;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ChequeDisbursementRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;

@RestController
@RequestMapping("rest/cheque-disbursements")
public class ChequeDisbursementRestController {

	@Autowired
	private ChequeDisbursementRepository chequeDisbursementRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@GetMapping("/{id}")
	public ChequeDisbursement get(@PathVariable Long id) {
		return chequeDisbursementRepository.getOne(id);
	}

	@GetMapping()
	public List<ChequeDisbursement> list() {
		return chequeDisbursementRepository.findAll();
	}

	@GetMapping("/company/{companyId}")
	public List<ChequeDisbursement> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return chequeDisbursementRepository.findByCompany(company);
	}

	@PostMapping()
	public ChequeDisbursement upsert(@RequestBody ChequeDisbursement chequeDisbursement) {
		return chequeDisbursementRepository.save(chequeDisbursement);
	}

	public boolean delete(@RequestBody Long id) {
		chequeDisbursementRepository.deleteById(id);
		return true;
	}
}
