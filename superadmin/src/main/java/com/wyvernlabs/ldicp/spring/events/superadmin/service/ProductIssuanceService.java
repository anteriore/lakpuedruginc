package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.IssuedProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductIssuanceRepository;

@Service
@Transactional
public class ProductIssuanceService {
	@Autowired
	private ProductIssuanceRepository productIssuanceRepository;
	@Autowired
	private ProductStockCardService productStockCardService;
	@Autowired
	private ProductInventoryRepository productInventoryRepository;
	
	@Transactional
	public ProductIssuance saveProductIssuance(ProductIssuance productIssuance) {
		Long id = productIssuanceRepository.getMaxId();
		if(id == null) {
			id = 0L;
		}
		
		productIssuance.setPisNo("FGIS-" + ++id);
		for(IssuedProductInventory issuedProduct: productIssuance.getInventoryList()) {
			ProductInventory productInventory = productInventoryRepository.findByProductAndDepot(issuedProduct.getProduct(), productIssuance.getFromDepot());
			productInventory.setQuantity(productInventory.getQuantity() - issuedProduct.getQuantity());
			productInventoryRepository.save(productInventory);
			
			productStockCardService.saveProductStockCard("FG-Issuance", productIssuance.getCompany(), productIssuance.getFromDepot(), productIssuance.getDate(), issuedProduct.getQuantity(), productIssuance.getRemarks(), productIssuance.getRequestedBy(), "OUT", issuedProduct.getProduct());
		}
		return productIssuanceRepository.save(productIssuance);
	}
}
