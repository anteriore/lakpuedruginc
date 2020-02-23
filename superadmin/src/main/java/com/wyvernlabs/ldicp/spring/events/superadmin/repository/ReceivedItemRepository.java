package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivedItem;

public interface ReceivedItemRepository extends JpaRepository<ReceivedItem, Long> {
	public List<ReceivedItem> findByItem(Item item);

	public List<ReceivedItem> findByStatus(String string);
}
