package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Area;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AreaRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;

@Component
public class DepotData {
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private AreaRepository areaRepository;
	@Autowired
	private CompanyRepository companyRepository;
	
	public void init() {
		Depot depot = new Depot();
		Area luzon = areaRepository.findOne(1L);
		Company c1 = companyRepository.findOne(1L);
		depot.setCode("BAC-007");
		depot.setName("BACOLOD");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);
		
		depot = new Depot();
		depot.setCode("CEB-001");
		depot.setName("CEBU");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);
	}
}
