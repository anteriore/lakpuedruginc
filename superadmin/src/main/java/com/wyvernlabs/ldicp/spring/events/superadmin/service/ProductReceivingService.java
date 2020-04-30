package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.IssuedProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductReceiving;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductIssuanceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductReceivingRepository;

@Service
@Transactional
public class ProductReceivingService {
	@Autowired
	private ProductReceivingRepository productReceivingRepository;
	@Autowired
	private ProductStockCardService productStockCardService;
	@Autowired
	private ProductInventoryRepository productInventoryRepository;
	@Autowired
	private ProductIssuanceRepository productIssuanceRepository;

	@Transactional
	public ProductReceiving saveProductReceiving(ProductReceiving productReceiving) {
		Long id = productReceivingRepository.getMaxId();
		if (id == null) {
			id = 0L;
		}

		productReceiving.setPrsNo("FGRS-" + ++id);
		ProductIssuance productIssuance = productIssuanceRepository.getOne(productReceiving.getPis().getId());
		productIssuance.setStatus("Received");
		for (IssuedProductInventory issuedProduct : productIssuance.getInventoryList()) {
			ProductInventory productInventory = productInventoryRepository
					.findByProductAndDepot(issuedProduct.getProduct(), productReceiving.getDepot());
			if (productInventory != null) {
				productInventory.setQuantity(productInventory.getQuantity() + issuedProduct.getQuantity());
			} else {
				productInventory = new ProductInventory();
				productInventory.setCompany(productReceiving.getCompany());
				productInventory.setDateCreated(new Date());
				productInventory.setProduct(issuedProduct.getProduct());
				productInventory.setDepot(productReceiving.getDepot());
				productInventory.setQuantity(issuedProduct.getQuantity());
			}
			productInventoryRepository.save(productInventory);
			productStockCardService.saveProductStockCard("FG - Receiving", productReceiving.getCompany(),
					productReceiving.getDepot(), productReceiving.getDate(), issuedProduct.getQuantity(),
					productReceiving.getRemarks(), productReceiving.getReceivedBy(), "IN", issuedProduct.getProduct());
		}
		productIssuanceRepository.save(productIssuance);
		return productReceivingRepository.save(productReceiving);
	}
}
