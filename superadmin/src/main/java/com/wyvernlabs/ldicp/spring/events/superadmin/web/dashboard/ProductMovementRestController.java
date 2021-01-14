package com.wyvernlabs.ldicp.spring.events.superadmin.web.dashboard;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductMovement;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductMovementRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ProductMovementService;

@RestController
@RequestMapping("rest/product-movements")
public class ProductMovementRestController {
    @Autowired
    private ProductMovementService productMovementService;
    @Autowired
    private ProductMovementRepository productMovementRepository;
    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping("/{id}")
    public ProductMovement get(@PathVariable Long id) {
        return productMovementRepository.getOne(id);
    }

    @GetMapping()
    public List<ProductMovement> list() {
        return productMovementRepository.findAll();
    }

    @PostMapping()
    public ProductMovement upsert(@RequestBody ProductMovement productMovement) {
        return productMovementService.saveProductMovement(productMovement);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        productMovementRepository.deleteById(id);
        return true;
    }

    @GetMapping("/company/{id}")
    public List<ProductMovement> listByCompany(@PathVariable Long id) {
        Company company = companyRepository.getOne(id);
        return productMovementRepository.findByCompany(company);
    }

}
