package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductCategory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductCategoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductDivisionRepository;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;

@Component
public class ProductCategoryData {
	@Autowired
	private ProductCategoryRepository categoryRepository;
	@Autowired
	private ProductDivisionRepository divisionRepository;

	@Transactional
	public void init() {
		ProductCategory category = new ProductCategory();
		category.setCode("CAT1");
		category.setDescription("DESC1");
		category.setTitle("Category 1");
		category.setProductDivision(divisionRepository.getOne(1L));
		categoryRepository.save(category);

		readCSV("productcategoryData.csv");

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
				

					ProductCategory tempPC = new ProductCategory();
					tempPC.setCode(data[0].replace("\"", ""));
					tempPC.setDescription(data[1].replace("\"", ""));
					tempPC.setTitle("Category 1");
					tempPC.setProductDivision(divisionRepository.getOne(1L));
					categoryRepository.save(tempPC);


				


              
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
