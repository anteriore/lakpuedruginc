package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CreditMemo;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;

public interface CreditMemoRepository extends JpaRepository<CreditMemo, Long> {

	List<CreditMemo> findByDepot(Depot depot);

}
