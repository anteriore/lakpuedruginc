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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialReceiving;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MaterialReceivingRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.MaterialReceivingService;

@RestController
@RequestMapping("rest/material-receivings")
public class MaterialReceivingRestController {
	private static final Logger logger = LoggerFactory.getLogger(MaterialReceivingRestController.class);
	@Autowired
	private MaterialReceivingService materialReceivingService;
	@Autowired
	private MaterialReceivingRepository materialReceivingRepository;
	@Autowired
	private CompanyRepository companyRepository;

	@GetMapping("/{id}")
	public MaterialReceiving get(@PathVariable Long id) {
		return materialReceivingRepository.getOne(id);
	}

	@GetMapping()
	public List<MaterialReceiving> list() {
		return materialReceivingRepository.findAll();
	}

	@PostMapping()
	public MaterialReceiving upsert(@RequestBody MaterialReceiving item) {
		return materialReceivingService.saveMaterialReceiving(item);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		materialReceivingRepository.deleteById(id);
		return true;
	}

	@GetMapping("/company/{companyId}")
	public List<MaterialReceiving> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return materialReceivingRepository.findByCompany(company);
	}

}
