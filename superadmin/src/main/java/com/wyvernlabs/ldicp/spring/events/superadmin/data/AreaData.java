package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Area;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AreaRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;

@Component
public class AreaData {
	
	private CompanyRepository companyRepository;
	private AreaRepository areaRepository;
	
	public AreaData(CompanyRepository companyRepository, AreaRepository areaRepository) {
		this.companyRepository = companyRepository;
		this.areaRepository = areaRepository;
	}
	
	public void init() {
		Company c1 = companyRepository.getOne(1L);
		Area area1 = new Area();
		area1.setCode("1");
		area1.setName("QC HO");
		area1.setCompany(c1);
		areaRepository.save(area1);


		area1 = new Area();
		area1.setCode("2");
		area1.setName("BINAN");
		area1.setCompany(c1);
		areaRepository.save(area1);
		
		area1 = new Area();
		area1.setCode("3");
		area1.setName("MATATAG");
		area1.setCompany(c1);
		areaRepository.save(area1);

		area1 = new Area();
		area1.setCode("4");
		area1.setName("BACOLOD");
		area1.setCompany(c1);
		areaRepository.save(area1);

		area1 = new Area();
		area1.setCode("5");
		area1.setName("CEBU");
		area1.setCompany(c1);
		areaRepository.save(area1);

		area1 = new Area();
		area1.setCode("6");
		area1.setName("ILOILO");
		area1.setCompany(c1);
		areaRepository.save(area1);


		area1 = new Area();
		area1.setCode("7");
		area1.setName("DAVAO");
		area1.setCompany(c1);
		areaRepository.save(area1);

		area1 = new Area();
		area1.setCode("8");
		area1.setName("CDO");
		area1.setCompany(c1);
		areaRepository.save(area1);
	}
}
