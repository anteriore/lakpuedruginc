package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ClusterCode;

public interface ClusterCodeRepository extends JpaRepository<ClusterCode, Long>{
    public ClusterCode findByCode(String code) ;
}
