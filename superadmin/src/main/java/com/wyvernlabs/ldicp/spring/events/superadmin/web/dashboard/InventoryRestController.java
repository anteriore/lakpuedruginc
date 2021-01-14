package com.wyvernlabs.ldicp.spring.events.superadmin.web.dashboard;

import java.util.ArrayList;
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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Ingredient;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Recipe;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.RecipeRepository;

@RestController
@RequestMapping("rest/inventory")
public class InventoryRestController {
    private static final Logger logger = LoggerFactory.getLogger(InventoryRestController.class);

    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private ItemRepository itemRepository;
    @Autowired
    private RecipeRepository recipeRepository;

    @GetMapping("/{id}")
    public Inventory get(@PathVariable Long id) {
        return inventoryRepository.getOne(id);
    }

    @GetMapping()
    public List<Inventory> list() {
        return inventoryRepository.findAll();
    }

    @PostMapping()
    public Inventory upsert(@RequestBody Inventory item) {
        return inventoryRepository.save(item);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        inventoryRepository.deleteById(id);
        return true;
    }

    @GetMapping("/company/{companyId}")
    public List<Inventory> listByCompany(@PathVariable Long companyId) {
        Company company = companyRepository.getOne(companyId);
        return inventoryRepository.findByCompanyOrderByDateCreatedDesc(company);
    }

    @GetMapping("/company/{companyId}/item/{itemId}")
    public List<Inventory> listByCompany(@PathVariable Long companyId, @PathVariable Long itemId) {
        Company company = companyRepository.getOne(companyId);
        Item item = itemRepository.getOne(itemId);
        return inventoryRepository.findByCompanyAndItemOrderByDateCreatedDesc(company, item);
    }

    @GetMapping("/company/{companyId}/view")
    public List<Inventory> listByCompanyView(@PathVariable Long companyId) {
        Company company = companyRepository.getOne(companyId);
        return inventoryRepository.findSumQuantityByCompanyGroupByItem(company);
    }

    @GetMapping("/item/control-number/{controlNumber}")
    public Item findItemByControlNumber(@PathVariable String controlNumber) {
        List<Inventory> inventoryList = inventoryRepository.findByControlNumber(controlNumber);
        return inventoryList.size() > 0 ? inventoryList.get(0).getItem() : new Item();
    }

    @GetMapping("/company/{companyId}/stock/{itemId}")
    public int getStockQuantityOfItem(@PathVariable Long companyId, @PathVariable Long itemId) {
        Item item = itemRepository.getOne(itemId);
        Company company = companyRepository.getOne(companyId);
        int sum = 0;

        List<Inventory> inventoryList = inventoryRepository.findByItemAndCompany(item, company);
        for (Inventory inventory : inventoryList) {
            sum += inventory.getQuantity();
        }

        return sum;
    }

    @GetMapping("/company/{companyId}/recipe/{recipeId}")
    public List<Inventory> getRecipeItemsOnInventory(@PathVariable Long companyId, @PathVariable Long recipeId) {
        Recipe recipe = recipeRepository.getOne(recipeId);
        Company company = companyRepository.getOne(companyId);

        List<Inventory> inventoryList = new ArrayList<>();
        for (Ingredient ingredient : recipe.getActiveIngredientGroup().getIngredients()) {
            List<Inventory> inventories = inventoryRepository.findByItemAndCompany(ingredient.getItem(), company);
            inventoryList.addAll(inventories);
        }

        return inventoryList;
    }

}
