package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VendorRepository;

@Component
public class VendorData {
	private CompanyRepository companyRepository;
	private VendorRepository vendorRepository;
	
	public VendorData(CompanyRepository companyRepository, VendorRepository vendorRepository) {
		this.companyRepository = companyRepository;
		this.vendorRepository = vendorRepository;
	}
	
	public void init() {
		Company company = companyRepository.getOne(1L);
		Vendor vendor1 = new Vendor();
		vendor1.setCode("C1");
		vendor1.setCompany(company);
		vendor1.setName("Jollibee");
		vendor1.setTin("1234567890");
		vendorRepository.save(vendor1);
		
		Vendor vendor2 = new Vendor();
		vendor2.setCode("C2");
		vendor2.setCompany(company);
		vendor2.setName("McDo");
		vendor2.setTin("0987654321");
		vendorRepository.save(vendor2);
		
		Company company2 = companyRepository.getOne(2L);
		Vendor vendor3 = new Vendor();
		vendor3.setCode("C3");
		vendor3.setCompany(company2);
		vendor3.setName("Mang Inasal");
		vendor3.setTin("0912312313");
		vendorRepository.save(vendor3);
	}
	
	
}
