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
		Area luzon = areaRepository.getOne(1L);
		Area visayas = areaRepository.getOne(2L);
		Area mindanao = areaRepository.getOne(3L);
		Company c1 = companyRepository.getOne(1L);
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

		depot = new Depot();
		depot.setCode("ILO");
		depot.setName("ILOILO");
		depot.setArea(visayas);
		depot.setCompany(c1);
		depotRepository.save(depot);

		depot = new Depot();
		depot.setCode("DAV-004");
		depot.setName("DAVAO");
		depot.setArea(mindanao);
		depot.setCompany(c1);
		depotRepository.save(depot);

		depot = new Depot();
		depot.setCode("CDO");
		depot.setName("CAGAYAN DE ORO");
		depot.setArea(mindanao);
		depot.setCompany(c1);
		depotRepository.save(depot);

		depot = new Depot();
		depot.setCode("ZAM");
		depot.setName("ZAMBOANGA");
		depot.setArea(mindanao);
		depot.setCompany(c1);
		depotRepository.save(depot);

		depot = new Depot();
		depot.setCode("NOR-L");
		depot.setName("NORTH LUZON");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);

		depot = new Depot();
		depot.setCode("SOU-L");
		depot.setName("SOUTH LUZON");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);

		depot = new Depot();
		depot.setCode("CHA");
		depot.setName("CHAIN ACCOUNTS");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);


		depot = new Depot();
		depot.setCode("EXP");
		depot.setName("EXPORT");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);


		depot = new Depot();
		depot.setCode("SPE");
		depot.setName("SPECIAL ACCOUNTS");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);

		depot = new Depot();
		depot.setCode("WAL");
		depot.setName("WALK-IN ACCOUNTS");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);

		depot = new Depot();
		depot.setCode("EMP");
		depot.setName("EMPLOYEES");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);


		depot = new Depot();
		depot.setCode("SMARKET");
		depot.setName("SUPERMARKET");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);

		depot = new Depot();
		depot.setCode("TOLL");
		depot.setName("TOLLING");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);

		
		depot = new Depot();
		depot.setCode("MMANILA");
		depot.setName("METRO MANILA");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);
	}
}
