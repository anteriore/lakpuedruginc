package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesRep;

public interface SalesRepRepository extends JpaRepository<SalesRep, Long> {
    public SalesRep findByCode(String code) ;
}
