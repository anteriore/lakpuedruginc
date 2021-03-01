package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.IssuedProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ProductIssuanceService;

@Component
public class ProductIssuanceData {
	@Autowired
	private ProductIssuanceService productIssuanceService;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ProductRepository productRepository;

	@Transactional
	public void init() {
		ProductIssuance pis = new ProductIssuance();
		Company company = companyRepository.getOne(1L);
		Depot fromDepot = depotRepository.getOne(1L);
		Depot toDepot = depotRepository.getOne(2L);
		User requestedBy = userRepository.getOne(1L);

		pis.setCompany(company);
		pis.setDate(new Date());
		pis.setFromDepot(fromDepot);
		pis.setToDepot(toDepot);

		Set<IssuedProductInventory> inventoryList = new HashSet<IssuedProductInventory>();
		IssuedProductInventory inventory1 = new IssuedProductInventory();
		inventory1.setProduct(productRepository.getOne(1L));
		inventory1.setQuantity(505);
		inventoryList.add(inventory1);

		pis.setInventoryList(inventoryList);
		pis.setRemarks("remarks 1");
		pis.setRequestedBy(requestedBy);
		pis.setStatus("Pending");

		productIssuanceService.saveProductIssuance(pis);
	}
}
