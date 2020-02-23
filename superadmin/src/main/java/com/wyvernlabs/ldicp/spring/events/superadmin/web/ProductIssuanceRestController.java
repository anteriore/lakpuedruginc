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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductIssuanceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ProductIssuanceService;

@RestController
@RequestMapping("rest/product-issuances")
public class ProductIssuanceRestController {
	private static final Logger logger = LoggerFactory.getLogger(ProductIssuanceRestController.class);
	@Autowired
	private ProductIssuanceRepository productIssuanceRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private ProductIssuanceService productIssuanceService;
	@GetMapping("/{id}")
    public ProductIssuance get(@PathVariable Long id) {
        return productIssuanceRepository.getOne(id);
    }

    @GetMapping()
    public List<ProductIssuance> list() {
        return productIssuanceRepository.findAll();
    }

    @PostMapping()
    public ProductIssuance upsert(@RequestBody ProductIssuance item) {
    	return productIssuanceService.saveProductIssuance(item);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		productIssuanceRepository.delete(id);
		return true;
	}
    
    @GetMapping("/company/{companyId}")
	public List<ProductIssuance> listByCompanyAndDepot(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return productIssuanceRepository.findByCompany(company);
	}
    
    @GetMapping("/status/{status}/depot/{depotId}")
    public List<ProductIssuance> listByStatus(@PathVariable String status, @PathVariable Long depotId){
    	Depot depot = depotRepository.findOne(depotId);
    	return productIssuanceRepository.findByStatusAndToDepot(status, depot);
    }
}
