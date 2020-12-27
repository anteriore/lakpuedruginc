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

		Unit tempUnit  = new Unit();
		tempUnit.setName("Liter");
		tempUnit.setCode("LI");
		unitRepository.save(tempUnit);

		tempUnit.setName("BOT");
		tempUnit.setCode("BOT");
		unitRepository.save(tempUnit);

		tempUnit.setName("DRM");
		tempUnit.setCode("Drum");
		unitRepository.save(tempUnit);

		tempUnit.setName("STP");
		tempUnit.setCode("STP");
		unitRepository.save(tempUnit);

		tempUnit.setName("GMS");
		tempUnit.setCode("GMS");
		unitRepository.save(tempUnit);

		tempUnit.setName("G");
		tempUnit.setCode("G");
		unitRepository.save(tempUnit);

		tempUnit.setName("ML");
		tempUnit.setCode("ML");
		unitRepository.save(tempUnit);

		tempUnit.setName("GM");
		tempUnit.setCode("GM");
		unitRepository.save(tempUnit);

		tempUnit.setName("BOX");
		tempUnit.setCode("BOX");
		unitRepository.save(tempUnit);

		tempUnit.setName("KGS");
		tempUnit.setCode("KGS");
		unitRepository.save(tempUnit);

		tempUnit.setName("K");
		tempUnit.setCode("K");
		unitRepository.save(tempUnit);


		tempUnit.setName("VIA");
		tempUnit.setCode("VIA");
		unitRepository.save(tempUnit);

		tempUnit.setName("LT");
		tempUnit.setCode("LT");
		unitRepository.save(tempUnit);

		tempUnit.setName("PCS");
		tempUnit.setCode("PCS");
		unitRepository.save(tempUnit);

		tempUnit.setName("VL");
		tempUnit.setCode("VL");
		unitRepository.save(tempUnit);

		tempUnit.setName("KG-");
		tempUnit.setCode("KG-");
		unitRepository.save(tempUnit);

		tempUnit.setName("VLS");
		tempUnit.setCode("VLS");
		unitRepository.save(tempUnit);

		tempUnit.setName("CAP");
		tempUnit.setCode("CAP");
		unitRepository.save(tempUnit);

		tempUnit.setName("TAB");
		tempUnit.setCode("TAB");
		unitRepository.save(tempUnit);

		tempUnit.setName("BLT");
		tempUnit.setCode("BLT");
		unitRepository.save(tempUnit);

		tempUnit.setName("ROLL");
		tempUnit.setCode("ROLL");
		unitRepository.save(tempUnit);

		tempUnit.setName("MG");
		tempUnit.setCode("MG");
		unitRepository.save(tempUnit);

		tempUnit.setName("INDBOX");
		tempUnit.setCode("INDBOX");
		unitRepository.save(tempUnit);

	}
}
