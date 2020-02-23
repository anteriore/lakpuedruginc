package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.ArrayList;
import java.util.Date;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.IngredientGroup;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.RecipeService;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Ingredient;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Recipe;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.RecipeRepository;

import java.util.List;

@Component
public class RecipeData {

    @Autowired
	private RecipeRepository recipeRepository;
    @Autowired
	private ItemRepository itemRepository;
    @Autowired
	private FinishedGoodRepository finishedGoodRepository;
    @Autowired
	private CompanyRepository companyRepository;
    @Autowired
    private RecipeService recipeService;

	
	public void init() {
		Recipe centuryTuna = new Recipe();

		centuryTuna.setCompany(companyRepository.getOne(1L));

		List<IngredientGroup> ingredientGroups = new ArrayList<>();
		IngredientGroup ingredientGroup1 = new IngredientGroup();
		ingredientGroup1.setName("1 bundle (6 pcs)");


		IngredientGroup ingredientGroup2 = new IngredientGroup();
		ingredientGroup2.setName("1 pack (3 pcs)");




		centuryTuna.setApprovedBy("Manuel");
		centuryTuna.setApprovedDate(new Date());
		centuryTuna.setDate(new Date());
		centuryTuna.setFinishedGood(finishedGoodRepository.getOne(1L));
		centuryTuna.setRemarks("no remarks");
		centuryTuna.setStatus("Active");


		Ingredient can1 = new Ingredient();
		can1.setItem(itemRepository.getOne(2L));
		can1.setQuantity(6);
		can1.setUnit("pc");

		Ingredient cornedTuna1 = new Ingredient();
		cornedTuna1.setItem(itemRepository.getOne(1L));
		cornedTuna1.setQuantity(60);
		cornedTuna1.setUnit("g");

		Ingredient can2 = new Ingredient();
		can2.setItem(itemRepository.getOne(2L));
		can2.setQuantity(3);
		can2.setUnit("pc");

		Ingredient cornedTuna2 = new Ingredient();
		cornedTuna2.setItem(itemRepository.getOne(1L));
		cornedTuna2.setQuantity(30);
		cornedTuna2.setUnit("g");


		List<Ingredient> ingredients1 = new ArrayList<Ingredient>();
		ingredients1.add(can1);
		ingredients1.add(cornedTuna1);

		ingredientGroup1.setIngredients(ingredients1);

		List<Ingredient> ingredients2 = new ArrayList<Ingredient>();
		ingredients2.add(can2);
		ingredients2.add(cornedTuna2);

		ingredientGroup2.setIngredients(ingredients2);

		ingredientGroups.add(ingredientGroup1);
		ingredientGroups.add(ingredientGroup2);

		centuryTuna.setIngredientGroups(ingredientGroups);

        recipeService.save(centuryTuna);

		Recipe spicyTuna = new Recipe();

		spicyTuna.setCompany(companyRepository.getOne(1L));

		List<IngredientGroup> ingredientGroups2 = new ArrayList<>();
		IngredientGroup ingredientGroup3 = new IngredientGroup();
		ingredientGroup3.setName("test 3");







		spicyTuna.setApprovedBy("Manuel");
		spicyTuna.setApprovedDate(new Date());
		spicyTuna.setDate(new Date());
		spicyTuna.setFinishedGood(finishedGoodRepository.getOne(2L));
		spicyTuna.setRemarks("no remarks");
		spicyTuna.setStatus("Active");


		Ingredient ingredient4 = new Ingredient();
		ingredient4.setItem(itemRepository.getOne(4L));
		ingredient4.setQuantity(301);
		ingredient4.setUnit("g");


		List<Ingredient> ingredients3 = new ArrayList<Ingredient>();
		ingredients3.add(ingredient4);

		ingredientGroup3.setIngredients(ingredients3);


		ingredientGroups2.add(ingredientGroup3);

		spicyTuna.setIngredientGroups(ingredientGroups2);

        recipeService.save(spicyTuna);
	}
}
