package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Department;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepartmentRepository;


import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;


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
		//Department department = new Department();
		
		//dont use these
		/*
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
		*/
    	//dont use these
		
		readCSV("departmentData.csv");
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
				//for (int i = 0; i < data.length; i++) {
					//System.out.print(i+")["+ data[i].replace("\"", "")+"]" );
					//Client(String code,String name,String Address,String proprietor,String telephoneNumbers,int terms, String tin,String vat)

					Department tempdepartment = new Department();
					tempdepartment.setCode(data[0].replace("\"", ""));
					tempdepartment.setName(data[1].replace("\"", ""));
					tempdepartment.setCompany(company);
					departmentRepository.save(tempdepartment);


              
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
