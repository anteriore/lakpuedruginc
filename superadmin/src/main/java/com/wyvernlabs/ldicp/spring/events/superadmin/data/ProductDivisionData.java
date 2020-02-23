package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductDivision;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductDivisionRepository;

@Component
public class ProductDivisionData {
	@Autowired
	private ProductDivisionRepository divisionRepository;
	
	@Autowired
	public void init() {
		ProductDivision division = new ProductDivision();
		division.setCode("DIV1");
		division.setTitle("Division 1");
		division.setDescription("DESC1");
		divisionRepository.save(division);
	}
}
