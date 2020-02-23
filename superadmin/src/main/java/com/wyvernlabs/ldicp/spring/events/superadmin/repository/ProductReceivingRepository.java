package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductReceiving;

public interface ProductReceivingRepository extends JpaRepository<ProductReceiving, Long>{

	List<ProductReceiving> findByCompany(Company company);

	@Query("SELECT MAX(fgrs.id) FROM ProductReceiving fgrs")
	Long getMaxId();


}
