package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Area;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;


public interface AreaRepository extends JpaRepository<Area, Long>{
	public List<Area> findByCompany(Company company);
	public Area findByCompanyAndCode(Company company, String code);
}
