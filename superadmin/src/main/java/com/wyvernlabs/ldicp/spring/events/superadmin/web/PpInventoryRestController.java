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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PpInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MoInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PpInventoryRepository;


@RestController
@RequestMapping("rest/ppInventory")
public class PpInventoryRestController {
    private static final Logger logger = LoggerFactory.getLogger(PpInventoryRestController.class);

    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private PpInventoryRepository ppInventoryRepository;
    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private MoInventoryRepository moInventoryRepository;


    @PostMapping
    public PpInventory upsert(@RequestBody PpInventory ppInventory) {
        inventoryRepository.save(ppInventory.getMoInventory().getInventoryList());
        moInventoryRepository.save(ppInventory.getMoInventory());
        return ppInventoryRepository.save(ppInventory);
    }

    @GetMapping("/{id}")
    public PpInventory get(@PathVariable Long id) {
        return ppInventoryRepository.getOne(id);
    }

    @GetMapping("/company/{companyId}")
    public List<PpInventory> listByCompany(@PathVariable Long companyId) {
        Company company = companyRepository.findOne(companyId);
        return ppInventoryRepository.findByCompany(company);
    }


    @GetMapping()
    public List<PpInventory> list() {
        return ppInventoryRepository.findAll();
    }

}
