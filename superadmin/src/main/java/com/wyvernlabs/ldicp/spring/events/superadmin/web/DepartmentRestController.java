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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Department;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepartmentRepository;

@RestController
@RequestMapping("rest/departments")
public class DepartmentRestController {
	private static final Logger logger = LoggerFactory.getLogger(DepartmentRestController.class);

	private DepartmentRepository departmentRepository;
	private CompanyRepository companyRepository;

	public DepartmentRestController(DepartmentRepository departmentRepository, CompanyRepository companyRepository) {
		this.departmentRepository = departmentRepository;
		this.companyRepository = companyRepository;
	}

	@GetMapping("/{id}")
	public Department get(@PathVariable Long id) {
		return departmentRepository.getOne(id);
	}

	@GetMapping()
	public List<Department> list() {
		return departmentRepository.findAll();
	}

	@PostMapping()
	public Department upsert(@RequestBody Department department) {
		return departmentRepository.save(department);
	}

	@GetMapping("/company/{companyId}")
	public List<Department> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return departmentRepository.findByCompany(company);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		departmentRepository.deleteById(id);
		return true;
	}

	@GetMapping("/name/{departmentName}")
	public Department getByName(@PathVariable String departmentName) {
		return departmentRepository.findByName(departmentName);
	}

}
