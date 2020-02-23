package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MemoSlip;

public interface MemoSlipRepository extends JpaRepository<MemoSlip, Long> {

	List<MemoSlip> findByDepot(Depot depot);

}
