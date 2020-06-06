package com.wyvernlabs.ldicp.spring.events.superadmin.web;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Recipe;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.RecipeRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.RecipeService;

@RestController
@RequestMapping("rest/recipes")
public class RecipeRestController {
    private static final Logger logger = LoggerFactory.getLogger(RecipeRestController.class);
    @Autowired
    private RecipeRepository recipeRepository;
    @Autowired
    private FinishedGoodRepository finishedGoodRepository;
    @Autowired
    private RecipeService recipeService;

    @GetMapping("/{id}")
    public Recipe get(@PathVariable Long id) {
        return recipeRepository.getOne(id);
    }

    @GetMapping()
    public List<Recipe> list() {
        return recipeRepository.findAll();
    }

    @GetMapping("/status/{status}")
    public List<Recipe> listByStatus(@PathVariable String status) {
        return recipeRepository.findByStatus(status);
    }

    @GetMapping("/finished-good/{id}")
    public List<Recipe> listByFinishedGood(@PathVariable Long id) {
        FinishedGood finishedGood = finishedGoodRepository.getOne(id);
        return recipeRepository.findByFinishedGood(finishedGood);
    }

    @PostMapping()
    public Recipe upsert(@RequestBody Recipe recipe) {
        return recipeService.save(recipe);
    }
}
