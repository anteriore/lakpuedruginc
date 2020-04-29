package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductMovement;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductMovementItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.ProductMovementType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ProductMovementService;

@Component
public class ProductMovementData {
	@Autowired
	private ProductMovementService productMovementService;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ProductRepository productRepository;

	public void init() {
		ProductMovement pm = new ProductMovement();
		Company company = companyRepository.getOne(1L);
		Depot depot = depotRepository.getOne(1L);
		User requestedBy = userRepository.getOne(1L);
		Product product = productRepository.getOne(1L);

		List<ProductMovementItem> products = new ArrayList<ProductMovementItem>();
		pm.setCompany(company);
		pm.setDate(new Date());
		pm.setDepot(depot);
		ProductMovementItem productMovementItem = new ProductMovementItem();
		productMovementItem.setProduct(product);
		productMovementItem.setQuantity(50);
		products.add(productMovementItem);
		pm.setProducts(products);
		pm.setRemarks("remarks 1");
		pm.setRequestedBy(requestedBy);
		pm.setType(ProductMovementType.IN);

		productMovementService.saveProductMovement(pm);
	}
}
