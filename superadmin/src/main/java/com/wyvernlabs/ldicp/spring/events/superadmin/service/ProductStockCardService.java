package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductStockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductStockCardRepository;

@Component
public class ProductStockCardService {
	@Autowired
	private ProductStockCardRepository productStockCardRepository;
	
	public void saveProductStockCard(String action, Company company, Depot depot, Date date, int quantity, String remarks, User requestedBy, String sign, Product product) {
		ProductStockCard productStockCard = new ProductStockCard();
		productStockCard.setAction(action);
		productStockCard.setDate(date);
		productStockCard.setProduct(product);
		productStockCard.setQuantity(quantity);
		productStockCard.setRemarks(remarks);
		productStockCard.setSign(sign);
		productStockCard.setUser(requestedBy);
		productStockCard.setCompany(company);
		productStockCard.setDepot(depot);
		productStockCardRepository.save(productStockCard);
	}
}
