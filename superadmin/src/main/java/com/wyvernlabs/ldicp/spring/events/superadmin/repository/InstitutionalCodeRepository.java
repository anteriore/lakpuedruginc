package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.InstitutionalCode;

public interface InstitutionalCodeRepository extends JpaRepository<InstitutionalCode, Long>{
    public InstitutionalCode findByCode(String code) ;
}
