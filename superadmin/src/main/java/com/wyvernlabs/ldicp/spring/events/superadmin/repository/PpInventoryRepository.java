package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PpInventory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PpInventoryRepository extends JpaRepository<PpInventory, Long> {

	List<PpInventory> findByCompany(Company company);

}
