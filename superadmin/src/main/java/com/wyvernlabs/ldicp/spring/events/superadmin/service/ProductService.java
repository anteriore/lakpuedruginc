package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;

@Service
@Transactional
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductInventoryRepository productInventoryRepository;
	
	@Transactional
	public Product saveProduct(Product product) {
		ProductInventory inventory = new ProductInventory();
		inventory.setCompany(product.getCompany());
		inventory.setDateCreated(new Date());
		inventory.setDepot(product.getDepot());
		inventory.setProduct(product);
		inventory.setQuantity(0);
		productInventoryRepository.save(inventory);
		return productRepository.save(product);
	}
}
