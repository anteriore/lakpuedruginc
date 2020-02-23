package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoInventory;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JobOrder;

import java.util.List;

public interface JobOrderRepository extends JpaRepository<JobOrder, Long> {

    List<JobOrder> findByMoInventory(MoInventory moInventory);
}
