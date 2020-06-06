package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;

public interface FinishedGoodRepository extends JpaRepository<FinishedGood, Long> {

    FinishedGood findByCodeOrName(String code, String name);

}
