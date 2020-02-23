package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.IssuedInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MaterialIssuanceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.MaterialIssuanceService;

@Component
public class MaterialIssuanceData {
	@Autowired
	private MaterialIssuanceRepository materialIssuanceRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private InventoryRepository inventoryRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired 
	private MaterialIssuanceService materialIssuanceService;
	@Transactional
	public void init() {
		MaterialIssuance mis = new MaterialIssuance();
		Company company = companyRepository.findOne(1L);
		User user = userRepository.findOne(1L);
		mis.setCompany(company);
		mis.setDate(new Date());
		Set<IssuedInventory> inventoryList = new HashSet<IssuedInventory>();
		Inventory inventory = inventoryRepository.findOne(1L);
		IssuedInventory issuedInventory = new IssuedInventory();
		issuedInventory.setControlNumber(inventory.getControlNumber());
		issuedInventory.setItem(inventory.getItem());
		issuedInventory.setQuantity(50);
		
		inventoryList.add(issuedInventory);

		mis.setInventoryList(inventoryList);
		mis.setCompany(company);
		mis.setRemarks("Remarks 1");
		mis.setRequestedBy(user);
		materialIssuanceService.saveMaterialIssuance(mis);
	}
}
