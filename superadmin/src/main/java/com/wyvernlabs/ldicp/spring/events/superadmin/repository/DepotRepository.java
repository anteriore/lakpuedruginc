package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;

public interface DepotRepository extends JpaRepository<Depot, Long> {
    public Depot findByCode(String code);
	public List<Depot> findByCompany(Company company);
}
