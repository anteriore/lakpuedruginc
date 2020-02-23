
package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemTypeRepository;

@Component
public class ItemTypeData {
	private ItemTypeRepository itemTypeRepository;

	public ItemTypeData(ItemTypeRepository itemTypeRepository) {
		this.itemTypeRepository = itemTypeRepository;
	}
	
	public void init() {
		ItemType rawMaterials = new ItemType();
		rawMaterials.setCode("RM");
		rawMaterials.setName("Raw Materials");
		itemTypeRepository.save(rawMaterials);
		
		ItemType packagingMaterials = new ItemType();
		packagingMaterials.setCode("PM");
		packagingMaterials.setName("Packaging Materials");
		itemTypeRepository.save(packagingMaterials);
		
		ItemType engineeringMaterials = new ItemType();
		engineeringMaterials.setCode("ENG");
		engineeringMaterials.setName("Engineering Materials");
		itemTypeRepository.save(engineeringMaterials);
	}
}
