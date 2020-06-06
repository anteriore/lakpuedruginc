package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VendorRepository;

@RestController
@RequestMapping("rest/vendors")
public class VendorRestController {
	private static final Logger logger = LoggerFactory.getLogger(VendorRestController.class);

	private VendorRepository vendorRepository;
	private CompanyRepository companyRepository;

	public VendorRestController(VendorRepository vendorRepository, CompanyRepository companyRepository) {
		this.vendorRepository = vendorRepository;
		this.companyRepository = companyRepository;
	}

	@GetMapping("/{id}")
	public Vendor get(@PathVariable Long id) {
		return vendorRepository.getOne(id);
	}

	@GetMapping()
	public List<Vendor> list() {
		return vendorRepository.findAll();
	}

	@PostMapping()
	public Vendor upsert(@RequestBody Vendor vendor) {
		return vendorRepository.save(vendor);
	}

	@GetMapping("/company/{companyId}")
	public List<Vendor> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return vendorRepository.findByCompany(company);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		vendorRepository.deleteById(id);
		return true;
	}
}
