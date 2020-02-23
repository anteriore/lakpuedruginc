package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CancelRequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;

public interface CancelRequestedItemRepository extends JpaRepository<CancelRequestedItem, Long> {

	CancelRequestedItem findLastByRequestedItem(RequestedItem item);

}
