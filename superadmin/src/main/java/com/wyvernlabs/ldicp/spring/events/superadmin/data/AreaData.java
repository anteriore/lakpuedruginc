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
		area1.setCode("L");
		area1.setName("LUZON");
		area1.setCompany(c1);
		areaRepository.save(area1);
		Area area2 = new Area();
		area2.setCode("V");
		area2.setName("VISAYAS");
		area2.setCompany(c1);
		areaRepository.save(area2);
		Area area3 = new Area();
		area3.setCode("M");
		area3.setName("MINDANAO");
		area3.setCompany(c1);
		areaRepository.save(area3);
		
		
	}
}
