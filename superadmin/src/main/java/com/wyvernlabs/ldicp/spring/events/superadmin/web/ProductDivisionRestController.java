package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductDivision;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductDivisionRepository;

@RestController
@RequestMapping("rest/product-division-codes")
public class ProductDivisionRestController {

	@Autowired
	private ProductDivisionRepository productDivisionRepository;
	
	@GetMapping("/{id}")
    public ProductDivision get(@PathVariable Long id) {
        return productDivisionRepository.getOne(id);
    }

    @GetMapping()
    public List<ProductDivision> list() {
        return productDivisionRepository.findAll();
    }

    @PostMapping()
    public ProductDivision upsert(@RequestBody ProductDivision depot) {
        return productDivisionRepository.save(depot);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
    	productDivisionRepository.delete(id);
		return true;
    }
}
