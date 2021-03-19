package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VendorRepository;


import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;
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

		readCSV("vendorData.csv");
	}






	public void readCSV(String csvname){
		String csvFile = "../src/main/java/com/wyvernlabs/ldicp/spring/events/superadmin/csv/"+csvname;
        BufferedReader br = null;
        String line = "";
		System.out.println("Working Directory = " + System.getProperty("user.dir"));
		Company company = companyRepository.getOne(1L);
        try {				
            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {

                String[] data = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
	

					Vendor tempvendor = new Vendor();
					/*
					tempvendor.setCompany(company);
					tempvendor.setCode(data[0].replace("\"", ""));
					tempvendor.setName(data[1].replace("\"", ""));
					tempvendor.setAddress(data[2].replace("\"", ""));//tempvendor.setDeliveryAddress(data[2].replace("\"", ""));
					//tempvendor.setProprietor(data[3].replace("\"", ""));
					tempvendor.setPhoneNumber(data[4].replace("\"", ""));
					tempvendor.setTerms(Integer.parseInt( data[5].replace("\"", "")));
					tempvendor.setTin(data[6].replace("\"", ""));
					tempvendor.setVat(data[7].replace("\"", ""));
					vendorRepository.save(tempvendor);
					*/

					tempvendor.setCompany(company);
					tempvendor.setCode(data[0].replace("\"", ""));
					tempvendor.setName(data[1].replace("\"", ""));
					tempvendor.setAddress(data[3].replace("\"", ""));//tempvendor.setDeliveryAddress(data[2].replace("\"", ""));
					tempvendor.setContactPerson(data[4].replace("\"", ""));
					tempvendor.setPhoneNumber(data[5].replace("\"", ""));
					tempvendor.setTerms(Integer.parseInt( data[6].replace("\"", "")));
					tempvendor.setTin(data[7].replace("\"", ""));
					tempvendor.setVat(data[8].replace("\"", ""));
					vendorRepository.save(tempvendor);



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
