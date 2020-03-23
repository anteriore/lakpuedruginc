package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Procedures;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProcedureArea;

public interface ProcedureRepository extends JpaRepository<Procedures, Long> {

	List<Procedures> findByProcedureArea(ProcedureArea procedureArea);

}
