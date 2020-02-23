package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.EngineeringInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;

public interface EngineeringInventoryRepository extends JpaRepository<EngineeringInventory, Long> {

	List<EngineeringInventory> findByCompanyOrderByItem(Company company);

	EngineeringInventory findByItem(Item item);

}
