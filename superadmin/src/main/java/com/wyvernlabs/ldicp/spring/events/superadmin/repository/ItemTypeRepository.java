package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;

import java.util.List;

public interface ItemTypeRepository extends JpaRepository<ItemType, Long>{
	public List<ItemType> findByCode(String code);

}
