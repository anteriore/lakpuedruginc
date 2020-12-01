package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ProductService;

@RestController
@RequestMapping("rest/products")
public class ProductRestController {
    private static final Logger logger = LoggerFactory.getLogger(ProductRestController.class);
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private DepotRepository depotRepository;
    @Autowired
    private ProductService productService;

    @GetMapping("/{id}")
    public Product get(@PathVariable Long id) {
        return productRepository.getOne(id);
    }

    @GetMapping()
    public List<Product> list() {
        return productRepository.findAll();
    }

    @PostMapping()
    public Product upsert(@RequestBody Product Product) {
        return productService.saveProduct(Product);
    }

    @GetMapping("/company/{id}")
    public List<Product> listByCompany(@PathVariable Long id) {
        Company company = companyRepository.getOne(id);
        return productRepository.findByCompany(company);
    }

    @GetMapping("/depot/{id}")
    public List<Product> listByDepot(@PathVariable Long id) {
        Depot depot = depotRepository.getOne(id);
        return productRepository.findByDepot(depot); 
    }

    //dungan added this
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		productRepository.deleteById(id);
        return true;
    }




}
