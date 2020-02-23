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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductReceiving;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductReceivingRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ProductReceivingService;

@RestController
@RequestMapping("rest/product-receivings")
public class ProductReceivingRestController {
	private static final Logger logger = LoggerFactory.getLogger(ProductReceivingRestController.class);
	@Autowired
	private ProductReceivingService productReceivingService;
	@Autowired
	private ProductReceivingRepository productReceivingRepository;
	@Autowired
	private CompanyRepository companyRepository;
	
	@GetMapping("/{id}")
    public ProductReceiving get(@PathVariable Long id) {
        return productReceivingRepository.getOne(id);
    }

    @GetMapping()
    public List<ProductReceiving> list() {
        return productReceivingRepository.findAll();
    }

    @PostMapping()
    public ProductReceiving upsert(@RequestBody ProductReceiving item) {
    	return productReceivingService.saveProductReceiving(item);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		productReceivingRepository.delete(id);
		return true;
	}
    
    @GetMapping("/company/{companyId}")
	public List<ProductReceiving> listByCompanyAndDepot(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return productReceivingRepository.findByCompany(company);
	}
    
}
