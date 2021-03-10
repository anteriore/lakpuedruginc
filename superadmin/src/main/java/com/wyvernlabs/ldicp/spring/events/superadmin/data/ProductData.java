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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClassificationRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductCategoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductDivisionRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UnitRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;

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
	@Autowired
	private ProductInventoryRepository productInventoryRepository;
	@Autowired
	private DepotRepository depotRepository;

	public void init() {
		FinishedGood fg = finishedGoodRepository.getOne(1L);
		Product product = new Product();
		Company company = companyRepository.getOne(1L);
		Classification classification = classificationRepository.getOne(1L);

		/*
		product.setClassification(classification);
		product.setDivision(divisionRepository.getOne(1L));
		product.setCategory(categoryRepository.getOne(1L));
		product.setCompany(company);
		product.setExpiration(1);
		product.setLotNumber("LOT#12345");
		product.setQuantityPerBox(25);
		product.setReorderLevel(1000);
		product.setBigUnit(unitRepository.findByCode("g"));
		product.setSmallUnit(unitRepository.findByCode("kg"));
		product.setUnitPrice(50D);
		product.setFinishedGood(fg);
		productRepository.save(product);



		product = new Product();
		product.setClassification(classification);
		product.setDivision(divisionRepository.getOne(1L));
		product.setCategory(categoryRepository.getOne(1L));
		product.setCompany(company);
		product.setExpiration(2);
		product.setLotNumber("LOT#8888");
		product.setQuantityPerBox(15);
		product.setReorderLevel(1000);
		product.setBigUnit(unitRepository.findByCode("g"));
		product.setSmallUnit(unitRepository.findByCode("kg"));
		product.setUnitPrice(50D);
		product.setFinishedGood(fg);
		productRepository.save(product);


		product = new Product();
		fg = finishedGoodRepository.getOne(2L);
		product.setClassification(classification);
		product.setDivision(divisionRepository.getOne(1L));
		product.setCategory(categoryRepository.getOne(1L));
		product.setCompany(company);
		product.setExpiration(3);
		product.setLotNumber("LOT#9999");
		product.setQuantityPerBox(25);
		product.setReorderLevel(1000);
		product.setBigUnit(unitRepository.findByCode("g"));
		product.setSmallUnit(unitRepository.findByCode("kg"));
		product.setUnitPrice(50D);
		product.setFinishedGood(fg);
		productRepository.save(product);
		*/



		
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
		readCSV("product-fgData.csv");
	}








	public void readCSV(String csvname){
		String csvFile = "../src/main/java/com/wyvernlabs/ldicp/spring/events/superadmin/csv/"+csvname;
        BufferedReader br = null;
        String line = "";
		System.out.println("Working Directory = " + System.getProperty("user.dir"));
		Company company = companyRepository.getOne(1L);
		//FinishedGood fg = new FinishedGood();

        try {				
            br = new BufferedReader(new FileReader(csvFile));
            while ((line = br.readLine()) != null) {

                String[] data = line.split(",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)", -1);
					//load finished good
					FinishedGood tempfg = new FinishedGood();
					tempfg.setCode(data[1].replace("\"", ""));
					tempfg.setName(data[4].replace("\"", ""));
					finishedGoodRepository.save(tempfg);

					//create product
					Product tempproduct = new Product();
					tempproduct.setCompany(companyRepository.getOne( Long.parseLong(  data[0].replace("\"", "") )  ));


					tempproduct.setClassification(classificationRepository.findByCode(data[3].replace("\"", "")));
					tempproduct.setDivision(divisionRepository.getOne(1L));//no data
					tempproduct.setCategory(categoryRepository.findByCode(data[2].replace("\"", "")));
					
					//tempproduct.setExpiration(Integer.parseInt(  data[12].replace("\"", "") ));
					//System.out.println(data[4].replace("\"", "")+Integer.parseInt(  data[12].replace("\"", "") ));
					tempproduct.setExpiration(1);

					tempproduct.setStatus(data[11].replace("\"", ""));
					tempproduct.setExpiration(Integer.parseInt(  data[12].replace("\"", "") ));
					tempproduct.setLotNumber(data[10].replace("\"", ""));
					tempproduct.setQuantityPerBox(Integer.parseInt(  data[8].replace("\"", "") ));
					tempproduct.setDepot(depotRepository.findByCode("BIN-001"));
					tempproduct.setReorderLevel(1000);
					tempproduct.setBigUnit(unitRepository.findByCode(data[7].replace("\"", "")));
					tempproduct.setSmallUnit(unitRepository.findByCode(data[6].replace("\"", "")));
					tempproduct.setUnitPrice(Double.parseDouble(data[9].replace("\"", "")));
					tempproduct.setFinishedGood(tempfg);
					productRepository.save(tempproduct);



					
					ProductInventory inventory = new ProductInventory();
					inventory.setCompany(tempproduct.getCompany());
					inventory.setDateCreated(new Date());
					inventory.setDepot(depotRepository.findByCode("BIN-001"));
					inventory.setProduct(tempproduct);
					inventory.setQuantity(0);
					productInventoryRepository.save(inventory);
					
					
              
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
