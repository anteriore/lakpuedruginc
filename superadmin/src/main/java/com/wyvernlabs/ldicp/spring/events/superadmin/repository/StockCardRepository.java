package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.StockCard;

public interface StockCardRepository extends JpaRepository<StockCard, Long>{

	List<StockCard> findByControlNumber(String controlNumber);

	List<StockCard> findByControlNumberAndCompany(String controlNumber, Company company);
	
}
