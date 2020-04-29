package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Procedures;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProcedureArea;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProcedureAreaRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProcedureRepository;

@Component
public class ProcedureData {
	@Autowired
	private ProcedureRepository procedureRepository;
	@Autowired
	private ProcedureAreaRepository procedureAreaRepository;

	public void init() {
		Procedures procedure = new Procedures();
		ProcedureArea procedureArea = procedureAreaRepository.getOne(1L);
		procedure.setCode("PROC1");
		procedure.setName("Procedure 1");
		procedure.setProcedureArea(procedureArea);
		procedureRepository.save(procedure);
	}
}
