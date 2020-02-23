package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoCosting;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoCostingInventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoCostingInventoryRepository extends JpaRepository<MoCostingInventory, Long> {

}
