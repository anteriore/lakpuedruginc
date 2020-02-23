package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findByCompany(Company company);

	Product findByFinishedGoodAndLotNumber(FinishedGood finishedGood, String lotNumber);

	List<Product> findByFinishedGood(FinishedGood fg);
	
	List<Product> findByDepot(Depot depot);

}
