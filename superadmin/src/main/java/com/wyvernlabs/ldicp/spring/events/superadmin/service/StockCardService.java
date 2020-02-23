package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.StockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.StockCardRepository;

@Component
public class StockCardService {
	@Autowired
	private StockCardRepository stockCardRepository;
	
	public void saveStockCard(String action, Company company, String controlNumber, Date date, int quantity, String remarks, String sign, User user) {
		StockCard stockCard = new StockCard();
		stockCard.setAction(action);
		stockCard.setCompany(company);
		stockCard.setControlNumber(controlNumber);
		stockCard.setDate(date);
		stockCard.setQuantity(quantity);
		stockCard.setRemarks(remarks);
		stockCard.setSign(sign);
		stockCard.setUser(user);
		stockCardRepository.save(stockCard);
	}
}
