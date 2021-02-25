package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Unit;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemTypeRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UnitRepository;

@Component
public class ItemData {
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private ItemTypeRepository itemTypeRepository;
	@Autowired
	private UnitRepository unitRepository;

	public void init() {
		ItemType rawMaterial = itemTypeRepository.getOne(1L);
		ItemType packagingMaterial = itemTypeRepository.getOne(2L);
		ItemType engineeringMaterial = itemTypeRepository.getOne(3L);
		Unit grams = unitRepository.findByCode("G");
		Unit pieces = unitRepository.findByCode("PCS");
		Unit liter = unitRepository.findByCode("L");

		Item tuna = new Item();
		tuna.setCode("I1");
		tuna.setName("Tuna");
		tuna.setType(rawMaterial);
		tuna.setUnit(grams);
		itemRepository.save(tuna);

		Item can = new Item();
		can.setCode("C1");
		can.setName("Can");
		can.setType(packagingMaterial);
		can.setUnit(pieces);
		itemRepository.save(can);

		Item bottle = new Item();
		bottle.setCode("B1");
		bottle.setName("Bottle");
		bottle.setType(packagingMaterial);
		bottle.setUnit(pieces);
		itemRepository.save(bottle);

		Item water = new Item();
		water.setCode("W1");
		water.setName("Water");
		water.setType(rawMaterial);
		water.setUnit(liter);
		itemRepository.save(water);

		Item soda = new Item();
		soda.setCode("S1");
		soda.setName("Soda");
		soda.setType(rawMaterial);
		soda.setUnit(liter);
		itemRepository.save(soda);

		Item glass = new Item();
		glass.setCode("G1");
		glass.setName("Glass");
		glass.setType(packagingMaterial);
		glass.setUnit(pieces);
		itemRepository.save(glass);

		Item creamer = new Item();
		creamer.setCode("C2");
		creamer.setName("Creamer");
		creamer.setType(rawMaterial);
		creamer.setUnit(grams);
		itemRepository.save(creamer);

		Item coffeeBean = new Item();
		coffeeBean.setCode("CB1");
		coffeeBean.setName("Coffee Bean");
		coffeeBean.setType(rawMaterial);
		coffeeBean.setUnit(grams);
		itemRepository.save(coffeeBean);

		Item sugar = new Item();
		sugar.setCode("S2");
		sugar.setName("Sugar");
		sugar.setType(rawMaterial);
		sugar.setUnit(grams);
		itemRepository.save(sugar);

		Item screw = new Item();
		screw.setCode("ENG1");
		screw.setName("Screw");
		screw.setType(engineeringMaterial);
		screw.setUnit(grams);
		itemRepository.save(screw);
	}
}
