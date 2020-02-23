package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long>{
	public List<Department> findByCompany(Company company);

	public Department findByName(String department);
}
