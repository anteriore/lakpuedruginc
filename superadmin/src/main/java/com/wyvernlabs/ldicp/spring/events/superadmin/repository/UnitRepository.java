package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Unit;

public interface UnitRepository extends JpaRepository<Unit, Long> {

	public Unit findByCode(String code) ;
	
}
