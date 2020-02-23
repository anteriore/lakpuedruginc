package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;

public interface ItemRepository extends JpaRepository<Item, Long> {
	public List<Item> findByType(ItemType type);
	public Item findByCode(String code);
	
}
