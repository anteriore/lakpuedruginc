package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductStockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductStockCardRepository;

@RestController
@RequestMapping("rest/product-stock-cards")
public class ProductStockCardRestController {
	private static final Logger logger = LoggerFactory.getLogger(ProductStockCardRestController.class);
	@Autowired
	private ProductStockCardRepository productStockCardRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private ProductRepository productRepository;

	@GetMapping("/{id}")
	public ProductStockCard get(@PathVariable Long id) {
		return productStockCardRepository.getOne(id);
	}

	@GetMapping()
	public List<ProductStockCard> list() {
		return productStockCardRepository.findAll();
	}

	@PostMapping()
	public ProductStockCard upsert(@RequestBody ProductStockCard client) {
		return productStockCardRepository.save(client);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		productStockCardRepository.deleteById(id);
		return true;
	}

	@GetMapping("/company/{companyId}/product/{productId}")
	public List<ProductStockCard> listByProductAndCompany(@PathVariable Long companyId, @PathVariable Long productId) {
		Company company = companyRepository.getOne(companyId);
		Product product = productRepository.getOne(productId);
		return productStockCardRepository.findByProductAndCompany(product, company);
	}
}
