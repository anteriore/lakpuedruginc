package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface GroupRepository extends JpaRepository<Group, Long>{
	public List<Group> findByCompany(Company company);
}
