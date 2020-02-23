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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.EngineeringInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.EngineeringInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;

@RestController
@RequestMapping("rest/engineering-inventory")
public class EngineeringInventoryRestController {
	private static final Logger logger = LoggerFactory.getLogger(EngineeringInventoryRestController.class);
    
    @Autowired
    private EngineeringInventoryRepository engineeringInventoryRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ItemRepository itemRepository;
    
    @GetMapping("/{id}")
    public EngineeringInventory get(@PathVariable Long id) {
        return engineeringInventoryRepository.getOne(id);
    }

    @GetMapping()
    public List<EngineeringInventory> list() {
        return engineeringInventoryRepository.findAll();
    }

    @PostMapping()
    public EngineeringInventory upsert(@RequestBody EngineeringInventory item) {
        return engineeringInventoryRepository.save(item);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		engineeringInventoryRepository.delete(id);
		return true;
	}
    
    @GetMapping("/company/{companyId}")
	public List<EngineeringInventory> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return engineeringInventoryRepository.findByCompanyOrderByItem(company);
	}
}
