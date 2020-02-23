package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.IngredientGroup;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Recipe;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    public Recipe save(Recipe recipe) {
        List<Recipe> recipes = recipeRepository.findByFinishedGood(recipe.getFinishedGood());
        Recipe savedRecipe = null;
        List<IngredientGroup> ingredientGroups = null;
        if (recipes.size() > 0) {
            savedRecipe = recipes.get(0);
            ingredientGroups = savedRecipe.getIngredientGroups();
            List<Long> ids = ingredientGroups.stream().map(IngredientGroup::getId).collect(Collectors.toList());
            for (IngredientGroup ingredientGroup : recipe.getIngredientGroups()) {
                if (!ids.contains(ingredientGroup.getId())) {
                    ingredientGroups.add(ingredientGroup);
                }
            }
        } else {
            savedRecipe = recipeRepository.save(recipe);
            ingredientGroups = savedRecipe.getIngredientGroups();
        }





        if (ingredientGroups != null && ingredientGroups.size() > 0 && savedRecipe.getActiveIngredientGroup() == null) {
            IngredientGroup ingredientGroup = ingredientGroups.get(0);
            savedRecipe.setActiveIngredientGroup(ingredientGroup);
        } else if (recipe.getActiveIngredientGroup() != null) {
            if (savedRecipe.getActiveIngredientGroup().getId() != recipe.getActiveIngredientGroup().getId()) {
                savedRecipe.setActiveIngredientGroup(recipe.getActiveIngredientGroup());
            }
        }



        recipeRepository.save(savedRecipe);

        return savedRecipe;
    }
}
