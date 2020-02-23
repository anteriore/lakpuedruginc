package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Client;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesRep;

public interface ClientRepository extends JpaRepository<Client, Long>{
	
	public List<Client> findByCompany(Company company);
	public Page<Client> findByCompany(Company company, Pageable pageable);
	public List<Client> findByCompanyAndSalesRep(Company company, SalesRep salesRep);
}
