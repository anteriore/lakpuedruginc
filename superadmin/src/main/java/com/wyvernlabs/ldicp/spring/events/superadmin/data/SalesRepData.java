package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesRep;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesRepRepository;




import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;
@Component
public class SalesRepData {


    @Autowired
    private SalesRepRepository salesRepRepository;

	/*
	public ProvinceCodeData( ProvinceCodeRepository provinceCodeRepository) {
		this.provinceCodeRepository = provinceCodeRepository;
	
	}
	*/
	public void init() {


		readCSV("salesrepData.csv");
	}








	public void readCSV(String csvname){
		String csvFile = "../src/main/java/com/wyvernlabs/ldicp/spring/events/superadmin/csv/"+csvname;
        BufferedReader br = null;
        String line = "";
		System.out.println("Working Directory = " + System.getProperty("user.dir"));
	

        try {				
            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {

                String[] data = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
					//load finished good
	
					//create product
					SalesRep tempSR = new SalesRep();
					


				
					tempSR.setCode(data[0].replace("\"", ""));
					tempSR.setName(data[1].replace("\"", ""));
                    //tempSR.productCategory(data[2].replace("\"", ""));
					//productcategory
                    //regioncode
					
					salesRepRepository.save(tempSR);



					
			
              
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
