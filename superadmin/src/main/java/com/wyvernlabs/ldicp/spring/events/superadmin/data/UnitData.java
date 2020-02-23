package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Unit;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UnitRepository;

@Component
public class UnitData {
	@Autowired
	private UnitRepository unitRepository;
	
	public void init() {
		Unit g = new Unit();
		g.setName("Gram");
		g.setCode("g");
		unitRepository.save(g);
		
		Unit kg = new Unit();
		kg.setName("Kilogram");
		kg.setCode("kg");
		unitRepository.save(kg);
		
		Unit pc = new Unit();
		pc.setName("Piece");
		pc.setCode("pc");
		unitRepository.save(pc);
		
		Unit liter = new Unit();
		liter.setName("Liter");
		liter.setCode("L");
		unitRepository.save(liter);
	}
}
