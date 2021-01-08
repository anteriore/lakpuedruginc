package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Unit;

public interface ItemRepository extends JpaRepository<Item, Long> {
	public List<Item> findByType(ItemType type);
	public Item findByCode(String code);
	public List<Item> findAllByUnit(Unit unit);
	public List<Item> findByUnitId(Long id);

	//@Query(value = "SELECT * FROM Item i WHERE i.unit=:unit")
 	//Item getByUnit(@Param("unit") Optional<Unit> unit);
}
