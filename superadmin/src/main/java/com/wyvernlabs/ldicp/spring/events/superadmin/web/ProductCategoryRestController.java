package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductCategory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductDivision;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductCategoryRepository;

@RestController
@RequestMapping("rest/product-categories")
public class ProductCategoryRestController {
    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @GetMapping("/{id}")
    public ProductCategory get(@PathVariable Long id) {
        return productCategoryRepository.getOne(id);
    }

    @GetMapping()
    public List<ProductCategory> list() {
        return productCategoryRepository.findAll();
    }

    @PostMapping()
    public ProductCategory upsert(@RequestBody ProductCategory depot) {
        return productCategoryRepository.save(depot);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        productCategoryRepository.deleteById(id);
        return true;
    }
}
