package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Classification;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductCategory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductDivision;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClassificationRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductCategoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductDivisionRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UnitRepository;



import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.File;
import java.io.IOException;
@Component
public class ProductData {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private FinishedGoodRepository finishedGoodRepository;
	@Autowired
	private UnitRepository unitRepository;
	@Autowired
	private ProductCategoryRepository categoryRepository;
	@Autowired
	private ProductDivisionRepository divisionRepository;
	@Autowired
	private ClassificationRepository classificationRepository;
	@Autowired
	private CompanyRepository companyRepository;

	public void init() {
		FinishedGood fg = finishedGoodRepository.getOne(1L);
		Product product = new Product();
		Company company = companyRepository.getOne(1L);
		Classification classification = classificationRepository.getOne(1L);

		
		product.setClassification(classification);
		product.setDivision(divisionRepository.getOne(1L));
		product.setCategory(categoryRepository.getOne(1L));
		product.setCompany(company);
		product.setExpiration(new Date());
		product.setLotNumber("LOT#12345");
		product.setQuantityPerBox(25);
		product.setReorderLevel(1000);
		product.setBigUnit(unitRepository.findByCode("g"));
		product.setSmallUnit(unitRepository.findByCode("kg"));
		product.setUnitPrice(50D);
		product.setFinishedGood(fg);
		productRepository.save(product);


		product.setClassification(classification);
		product.setDivision(divisionRepository.getOne(1L));
		product.setCategory(categoryRepository.getOne(1L));
		product.setCompany(company);
		product.setExpiration(new Date());
		product.setLotNumber("LOT#8888");
		product.setQuantityPerBox(25);
		product.setReorderLevel(1000);
		product.setBigUnit(unitRepository.findByCode("g"));
		product.setSmallUnit(unitRepository.findByCode("kg"));
		product.setUnitPrice(50D);
		product.setFinishedGood(fg);
		productRepository.save(product);



		fg = finishedGoodRepository.getOne(2L);
		product.setClassification(classification);
		product.setDivision(divisionRepository.getOne(1L));
		product.setCategory(categoryRepository.getOne(1L));
		product.setCompany(company);
		product.setExpiration(new Date());
		product.setLotNumber("LOT#9999");
		product.setQuantityPerBox(25);
		product.setReorderLevel(1000);
		product.setBigUnit(unitRepository.findByCode("g"));
		product.setSmallUnit(unitRepository.findByCode("kg"));
		product.setUnitPrice(50D);
		product.setFinishedGood(fg);
		productRepository.save(product);




		
		//finishedgood
		//(no classification)
		//USID DIVISION ID
		//(no category)
		//setpackagedescription
		//company number
		//expiration (fit expire(but its like just one integer))
		//FIT_LOTNO-lot number
		//FIT_QPB-quantity per box
		//OSCH-reorder level
		//BUOM
		//SUOM
		//FITUNITP-unitprice
		//FITCODE-finished good
		//readCSV("groupData.csv");
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
				

					Product tempproduct = new Product();
					//tempproduct.setName(data[0].replace("\"", ""));
					//tempproduct.setName(data[1].replace("\"", ""));
					tempproduct.setCompany(company);
					productRepository.save(tempproduct);


					/*
					ProductInventory inventory = new ProductInventory();
					inventory.setCompany(product.getCompany());
					inventory.setDateCreated(new Date());
					inventory.setDepot(product.getDepot());
					inventory.setProduct(product);
					inventory.setQuantity(0);
					productInventoryRepository.save(inventory);
					*/

              
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
