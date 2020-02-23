package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialReceiving;

public interface MaterialReceivingRepository extends JpaRepository<MaterialReceiving, Long> {

	List<MaterialReceiving> findByCompany(Company company);
	
	@Query("SELECT MAX(mrs.id) FROM MaterialReceiving mrs")
	Long getMaxId();

}
