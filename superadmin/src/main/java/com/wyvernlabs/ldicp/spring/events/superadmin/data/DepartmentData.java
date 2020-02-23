package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Department;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepartmentRepository;

@Component
public class DepartmentData {
	private DepartmentRepository departmentRepository;
	private CompanyRepository companyRepository;
	
	public DepartmentData(DepartmentRepository departmentRepository, CompanyRepository companyRepository) {
		this.departmentRepository = departmentRepository;
		this.companyRepository = companyRepository;
	}
	
	public void init() {
		Company company = companyRepository.getOne(1L);
    	Department department = new Department();
    	department.setCode("A01");
    	department.setName("Admin");
    	department.setCompany(company);
    	departmentRepository.save(department);
    	Department department2 = new Department();
    	department2.setCode("P01");
    	department2.setName("Purchasing");
    	department2.setCompany(company);
    	departmentRepository.save(department2);
    	Department department3 = new Department();
    	department3.setCode("C01");
    	department3.setName("Costing");
    	department3.setCompany(company);
    	departmentRepository.save(department3);
    	Department department4 = new Department();
    	department4.setCode("M01");
    	department4.setName("MMD");
    	department4.setCompany(company);
    	departmentRepository.save(department4);
    	Department department5 = new Department();
    	department5.setCode("E01");
    	department5.setName("Engineering");
    	department5.setCompany(company);
    	departmentRepository.save(department5);
    	
    	
	}
	
	
}
