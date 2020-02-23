package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProcedureArea;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProcedureAreaRepository;

@Component
public class ProcedureAreaData {
	@Autowired
	private ProcedureAreaRepository procedureAreaRepository;
	
	public void init() {
		ProcedureArea procedureArea = new ProcedureArea();
		procedureArea.setCode("DISP");
		procedureArea.setName("Dispensary");
		procedureAreaRepository.save(procedureArea);
	}
}
