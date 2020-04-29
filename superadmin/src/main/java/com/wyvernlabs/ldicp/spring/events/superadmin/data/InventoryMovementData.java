package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.InventoryMovement.InventoryMovement;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.InventoryMovement.InventoryMovementItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.InventoryMovementType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryMovementRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.InventoryMovementService;

@Component
public class InventoryMovementData {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private InventoryMovementRepository inventoryMovementRepository;
	@Autowired
	private InventoryMovementService inventoryMovementService;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private InventoryRepository inventoryRepository;

	public void init() {
		InventoryMovement inventoryMovement = new InventoryMovement();
		Company company = companyRepository.getOne(1L);
		User user = userRepository.getOne(1L);
		inventoryMovement.setCompany(company);
		inventoryMovement.setDate(new Date());
		inventoryMovement.setRemarks("Remarks");
		inventoryMovement.setRequestedBy(user);
		inventoryMovement.setType(InventoryMovementType.IN);
		List<InventoryMovementItem> inventoryList = new ArrayList<InventoryMovementItem>();
		InventoryMovementItem inventoryMovementItem = new InventoryMovementItem();
		Inventory inventory = inventoryRepository.getOne(1L); // TUNA
		inventoryMovementItem.setControlNumber(inventory.getControlNumber());
		inventoryMovementItem.setItem(inventory.getItem());
		inventoryMovementItem.setQuantity(200);
		inventoryList.add(inventoryMovementItem);
		inventoryMovement.setInventory(inventoryList);

		inventoryMovementService.saveInventoryMovement(inventoryMovement);
	}
}
