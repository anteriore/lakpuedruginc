package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemTypeRepository;

@RestController
@RequestMapping("rest/item-types")
public class ItemTypeRestController {
    private static final Logger logger = LoggerFactory.getLogger(ItemTypeRestController.class);

    @Autowired
    private ItemTypeRepository itemTypeRepository;

    @GetMapping("/{id}")
    public ItemType get(@PathVariable Long id) {
        return itemTypeRepository.getOne(id);
    }

    @GetMapping()
    public List<ItemType> list() {
        return itemTypeRepository.findAll();
    }

    @PostMapping()
    public ItemType upsert(@RequestBody ItemType itemType) {
        return itemTypeRepository.save(itemType);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        itemTypeRepository.deleteById(id);
        return true;
    }

}
