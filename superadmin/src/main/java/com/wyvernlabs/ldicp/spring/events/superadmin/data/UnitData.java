package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Unit;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UnitRepository;



import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;
@Component
public class UnitData {
	@Autowired
	private UnitRepository unitRepository;
	
	public void init() {

		/*
		Unit g = new Unit();
		g.setName("Gram");
		g.setCode("g");
		unitRepository.save(g);
		
		Unit kg = new Unit();
		kg.setName("Kilogram");
		kg.setCode("kg");
		unitRepository.save(kg);
		
		Unit pc = new Unit();
		pc.setName("Piece");
		pc.setCode("pc");
		unitRepository.save(pc);
		
		Unit liter = new Unit();
		liter.setName("Liter");
		liter.setCode("L");
		unitRepository.save(liter);
		*/

		readCSV("unitData.csv");
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
				

					Unit tempunit = new Unit();
					tempunit.setCode(data[0].replace("\"", ""));
					tempunit.setName(data[1].replace("\"", ""));
				
					unitRepository.save(tempunit);


              
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
