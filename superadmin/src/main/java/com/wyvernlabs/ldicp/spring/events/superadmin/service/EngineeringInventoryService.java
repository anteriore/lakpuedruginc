package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.EngineeringInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.EngineeringInventoryRepository;

@Service
public class EngineeringInventoryService {
	@Autowired
	private EngineeringInventoryRepository engineeringInventoryRepository;
	
	@Transactional
	public EngineeringInventory addEngineeringInventory(Item item, int quantity, Company company) {
		EngineeringInventory engineeringInventory = engineeringInventoryRepository.findByItem(item);
		if(engineeringInventory != null) {
			engineeringInventory.setQuantity(engineeringInventory.getQuantity() + quantity);
		}else {
			engineeringInventory = new EngineeringInventory();
			engineeringInventory.setCompany(company);
			engineeringInventory.setItem(item);
			engineeringInventory.setQuantity(quantity);
		}
		return engineeringInventoryRepository.save(engineeringInventory);
	}
}
