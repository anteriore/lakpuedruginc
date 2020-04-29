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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MaterialIssuanceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.MaterialIssuanceService;

@RestController
@RequestMapping("rest/material-issuances")
public class MaterialIssuanceRestController {
	private static final Logger logger = LoggerFactory.getLogger(MaterialIssuanceRestController.class);
	@Autowired
	private MaterialIssuanceRepository materialIssuanceRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private InventoryRepository inventoryRepository;
	@Autowired
	private MaterialIssuanceService materialIssuanceService;

	@GetMapping("/{id}")
	public MaterialIssuance get(@PathVariable Long id) {
		return materialIssuanceRepository.getOne(id);
	}

	@GetMapping()
	public List<MaterialIssuance> list() {
		return materialIssuanceRepository.findAll();
	}

	@PostMapping()
	public MaterialIssuance upsert(@RequestBody MaterialIssuance item) {
		return materialIssuanceService.saveMaterialIssuance(item);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		materialIssuanceRepository.deleteById(id);
		return true;
	}

	@GetMapping("/company/{companyId}")
	public List<MaterialIssuance> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return materialIssuanceRepository.findByCompany(company);
	}

	@GetMapping("/status/{status}")
	public List<MaterialIssuance> listByStatus(@PathVariable String status) {
		return materialIssuanceRepository.findByStatus(status);
	}

}
