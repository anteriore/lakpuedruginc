package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Classification;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.ClassificationType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClassificationRepository;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;

@Component
public class ClassificationData {
	@Autowired
	private ClassificationRepository classificationRepository;
	
	public void init() {
		Classification c1 = new Classification();
		c1.setName("Over The Counter");
		c1.setCode("OTC");
//		c1.setType(ClassificationType.PRODUCT);
		classificationRepository.save(c1);
		
		Classification c2 = new Classification();
		c2.setName("LO");
		c2.setCode("Logistics");
//		c2.setType(ClassificationType.NONE);
		classificationRepository.save(c2);
		
		Classification c3 = new Classification();
		c3.setName("BO");
		c3.setCode("Back Office");
//		c3.setType(ClassificationType.NONE);
		classificationRepository.save(c3);
		readCSV("classificationData2.csv");
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
				

					Classification tempPC = new Classification();
					tempPC.setCode(data[0].replace("\"", ""));
					tempPC.setName(data[1].replace("\"", ""));
			
					classificationRepository.save(tempPC);


				


              
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
