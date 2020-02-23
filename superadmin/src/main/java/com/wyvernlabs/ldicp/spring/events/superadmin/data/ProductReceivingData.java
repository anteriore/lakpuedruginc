package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductReceiving;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductIssuanceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductReceivingRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ProductReceivingService;

@Component
public class ProductReceivingData {
	@Autowired
	private ProductIssuanceRepository productIssuanceRepository;
	@Autowired
	private ProductReceivingService productReceivingService;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private UserRepository userRepository;
	public void init() {
		ProductIssuance pis = productIssuanceRepository.findOne(1L);
		ProductReceiving prs = new ProductReceiving();
		Company company = companyRepository.findOne(1L);
		Depot depot = depotRepository.findOne(1L);
		User receivedBy = userRepository.findOne(1L);
		
		prs.setCompany(company);
		prs.setDate(new Date());
		prs.setDepot(depot);
		prs.setPis(pis);
		prs.setReceivedBy(receivedBy);
		prs.setRemarks("remarks 1");

		productReceivingService.saveProductReceiving(prs);
		
	}
}
