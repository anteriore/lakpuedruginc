package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoCosting;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoCostingEmployee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MoCostingEmployeeRepository extends JpaRepository<MoCostingEmployee, Long> {
	
}
