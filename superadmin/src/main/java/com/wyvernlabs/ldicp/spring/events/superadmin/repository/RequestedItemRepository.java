package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;

public interface RequestedItemRepository extends JpaRepository<RequestedItem, Long> {
	public List<RequestedItem> findByStatusNotAndCompany(String status, Company company);

	public List<RequestedItem> findByStatusNotAndCompanyAndItem(String string, Company company, Item item);
	
}
