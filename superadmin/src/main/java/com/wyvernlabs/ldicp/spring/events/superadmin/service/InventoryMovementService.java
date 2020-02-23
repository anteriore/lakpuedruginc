package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.StockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.InventoryMovement.InventoryMovement;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.InventoryMovement.InventoryMovementItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.InventoryMovementType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryMovementRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.StockCardRepository;

@Component
public class InventoryMovementService {
	@Autowired
	private InventoryMovementRepository inventoryMovementRepository;
	@Autowired
	private InventoryRepository inventoryRepository;
	@Autowired
	private StockCardService stockCardService;
	@Autowired
	private CompanyRepository companyRepository;
	@Transactional
	public InventoryMovement saveInventoryMovement(InventoryMovement inventoryMovement) {
		Long id = inventoryMovementRepository.getMaxId();
		if(id == null) {
			id = 0L;
		}
		
		inventoryMovement.setNumber("MRIS-" + ++id);
		for(InventoryMovementItem item : inventoryMovement.getInventory()) {
			Inventory inventory = inventoryRepository.findByControlNumberAndCompany(item.getControlNumber(), inventoryMovement.getCompany());
			if(inventoryMovement.getType().equals(InventoryMovementType.IN)) {
				inventory.setQuantity(inventory.getQuantity() + item.getQuantity());
			}else if(inventoryMovement.getType().equals(InventoryMovementType.OUT)) {
				inventory.setQuantity(inventory.getQuantity() - item.getQuantity());
			}
			inventoryRepository.save(inventory);
			stockCardService.saveStockCard("MRIS(" + inventoryMovement.getClassification() + ")", companyRepository.findOne(inventoryMovement.getCompany().getId()), item.getControlNumber(), new Date(), item.getQuantity(), inventoryMovement.getRemarks(), inventoryMovement.getType().toString(), inventoryMovement.getRequestedBy());
		}
		return inventoryMovementRepository.save(inventoryMovement);
	}
}
