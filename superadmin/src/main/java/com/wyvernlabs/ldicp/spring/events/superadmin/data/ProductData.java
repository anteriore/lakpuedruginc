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

		product.setBigUnit(unitRepository.findByCode("g"));
		product.setClassification(classification);
		product.setDivision(divisionRepository.getOne(1L));
		product.setCategory(categoryRepository.getOne(1L));
		product.setCompany(company);
		product.setExpiration(new Date());
		product.setLotNumber("LOT#12345");
		product.setQuantityPerBox(25);
		product.setReorderLevel(1000);
		product.setSmallUnit(unitRepository.findByCode("kg"));
		product.setUnitPrice(50D);
		product.setFinishedGood(fg);
		productRepository.save(product);




		
		//BUOM
		//(no classification)
		//USID DIVISION ID
		//(no category)
		//company number
		//expiration (fit expire(but its like just one integer))
		//FIT_LOTNO-lot number
		//FIT_QPB-quantity per box
		//OSCH-reorder level
		//SUOM
		//FITUNITP-unitprice
		//FITCODE-finished good
	}
}
