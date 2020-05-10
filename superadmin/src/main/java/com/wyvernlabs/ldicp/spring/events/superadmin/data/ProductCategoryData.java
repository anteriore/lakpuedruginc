package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductCategory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductCategoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductDivisionRepository;

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
	}
}
