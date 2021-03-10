package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Area;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AreaRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;


import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;

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


		/*
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
		depot.setCode("MANILA");
		depot.setName("METRO MANILA");
		depot.setArea(luzon);
		depot.setCompany(c1);
		depotRepository.save(depot);


		*/


		readCSV("depotData.csv");
	}


	public void readCSV(String csvname){
		String csvFile = "../src/main/java/com/wyvernlabs/ldicp/spring/events/superadmin/csv/"+csvname;
        BufferedReader br = null;
        String line = "";
		System.out.println("Working Directory = " + System.getProperty("user.dir"));
		Company company = companyRepository.getOne(1L);
		Area luzon = areaRepository.getOne(1L);
        try {				
            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {

                String[] data = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
		

					Depot tempdepot = new Depot();

					tempdepot.setCompany(company);
					tempdepot.setCode(data[0].replace("\"", ""));
					tempdepot.setName(data[1].replace("\"", ""));
					tempdepot.setCompany(company);
					tempdepot.setArea(luzon);
					depotRepository.save(tempdepot);


					//tempvendor.setAddress(data[2].replace("\"", ""));//tempvendor.setDeliveryAddress(data[2].replace("\"", ""));
					//tempvendor.setProprietor(data[3].replace("\"", ""));
					//tempvendor.setPhoneNumber(data[4].replace("\"", ""));
					//tempvendor.setTerms(Integer.parseInt( data[5].replace("\"", "")));
					//tempvendor.setTin(data[6].replace("\"", ""));
					//tempvendor.setVat(data[7].replace("\"", ""));
					//vendorRepository.save(tempvendor);




				 // }
				 // System.out.println("");
              
            }

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
	

	}












}
