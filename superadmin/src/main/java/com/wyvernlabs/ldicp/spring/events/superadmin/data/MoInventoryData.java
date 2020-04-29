package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.*;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MoInventoryData {
	private static final Logger logger = LoggerFactory.getLogger(MoInventoryData.class);

	@Autowired
	private MoInventoryRepository moInventoryRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private FinishedGoodRepository finishedGoodRepository;
	@Autowired
	private InventoryRepository inventoryRepository;
	@Autowired
	private RecipeRepository recipeRepository;

	public MoInventoryData() {
	}

	public void init() {
		Company c1 = companyRepository.getOne(1L);
		User u1 = userRepository.getOne(1L);
		FinishedGood f1 = finishedGoodRepository.getOne(1L);
		Inventory i1 = inventoryRepository.getOne(1L);
		Recipe r1 = recipeRepository.getOne(1L);

		MoInventory m = new MoInventory();
		m.setMoNumber(1);
		m.setLotNumber(1);
		m.setCompany(c1);
		m.setBatchSize(3);
		m.setFinishedGood(f1);
		m.setType("RM");
		m.setRecipe(r1);
		m.setIngredientGroup(r1.getActiveIngredientGroup());
		ArrayList<Inventory> inventoryList = new ArrayList<>();
		inventoryList.add(i1);
		m.setInventoryList(inventoryList);

		moInventoryRepository.save(m);

	}

}
