package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CreditMemo;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.DebitMemo;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;

public interface DebitMemoRepository extends JpaRepository<DebitMemo, Long> {

	List<DebitMemo> findByDepot(Depot depot);

}
