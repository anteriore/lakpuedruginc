package com.wyvernlabs.ldicp.spring.events.superadmin.web.dashboard;

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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.InventoryMovement.InventoryMovement;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryMovementRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.InventoryMovementService;

@RestController
@RequestMapping("rest/inventory-movements")
public class InventoryMovementRestController {
    private static final Logger logger = LoggerFactory.getLogger(InventoryMovementRestController.class);

    @Autowired
    private InventoryMovementRepository inventoryMovementRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private InventoryMovementService inventoryMovementService;

    @GetMapping("/{id}")
    public InventoryMovement get(@PathVariable Long id) {
        return inventoryMovementRepository.getOne(id);
    }

    @GetMapping()
    public List<InventoryMovement> list() {
        return inventoryMovementRepository.findAll();
    }

    @GetMapping("/company/{companyId}")
    public List<InventoryMovement> listByCompany(@PathVariable Long companyId) {
        Company company = companyRepository.getOne(companyId);
        return inventoryMovementRepository.findByCompany(company);
    }

    @PostMapping()
    public InventoryMovement upsert(@RequestBody InventoryMovement item) {
        return inventoryMovementService.saveInventoryMovement(item);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        inventoryMovementRepository.deleteById(id);
        return true;
    }
}
