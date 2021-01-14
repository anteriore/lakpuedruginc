package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Area;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AreaRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;

@RestController
@RequestMapping("rest/areas")
public class AreaRestController {
	private static final Logger logger = LoggerFactory.getLogger(AreaRestController.class);

	private AreaRepository areaRepository;
	private CompanyRepository companyRepository;

	public AreaRestController(AreaRepository areaRepository, CompanyRepository companyRepository) {
		this.areaRepository = areaRepository;
		this.companyRepository = companyRepository;
	}

	@GetMapping("/{id}")
	public Area get(@PathVariable Long id) {
		return areaRepository.getOne(id);
	}

	@GetMapping()
	public List<Area> list() {
		return areaRepository.findAll();
	}

	@PostMapping()
	public Area upsert(@RequestBody Area area) {
		return areaRepository.save(area);
	}

	@GetMapping("/company/{companyId}")
	public List<Area> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return areaRepository.findByCompany(company);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		areaRepository.deleteById(id);
		return true;
	}
}
