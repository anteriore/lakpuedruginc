package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemTypeRepository;

@RestController
@RequestMapping("rest/items")
public class ItemRestController {
    private static final Logger logger = LoggerFactory.getLogger(ItemRestController.class);

    private ItemRepository itemRepository;
    private ItemTypeRepository itemTypeRepository;

    public ItemRestController(ItemRepository itemRepository, ItemTypeRepository itemTypeRepository) {
        this.itemRepository = itemRepository;
        this.itemTypeRepository = itemTypeRepository;
    }

    @GetMapping("/{id}")
    public Item get(@PathVariable Long id) {
        return itemRepository.getOne(id);
    }

    @GetMapping()
    public List<Item> list() {
        return itemRepository.findAll();
    }

    @PostMapping()
    public Item upsert(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        itemRepository.deleteById(id);
        return true;
    }

    @GetMapping("/type/{type}")
    public List<Item> listByType(@PathVariable String type) {
        List<ItemType> itemTypes = itemTypeRepository.findByCode(type);
        return itemRepository.findByType(itemTypes.get(0));
    }

    @GetMapping("/rm-pm")
    public List<Item> listRmPm() {
        List<ItemType> itemTypesRm = itemTypeRepository.findByCode("RM");
        List<ItemType> itemTypesPm = itemTypeRepository.findByCode("PM");
        List<Item> items = itemRepository.findByType(itemTypesRm.get(0));
        items.addAll(itemRepository.findByType(itemTypesPm.get(0)));
        return items;
    }

}
