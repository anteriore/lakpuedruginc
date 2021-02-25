package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;

@Component
public class FinishedGoodData {
	private FinishedGoodRepository finishedGoodRepository;
	
	public FinishedGoodData(FinishedGoodRepository finishedGoodRepository) {
		this.finishedGoodRepository = finishedGoodRepository;
	}
	
	
	public void init() {
		FinishedGood cornedTuna = new FinishedGood();
		cornedTuna.setCode("CT1");
		cornedTuna.setName("Z-LINCOMYCIN/SPECTINOMYCIN F.G");
		finishedGoodRepository.save(cornedTuna);
		
		FinishedGood spicyTuna = new FinishedGood();
		spicyTuna.setCode("ST1");
		spicyTuna.setName("BRIGHT WASH 250 ML");
		finishedGoodRepository.save(spicyTuna);
		
		FinishedGood coffee = new FinishedGood();
		coffee.setCode("CO1");
		coffee.setName("GUAIFENESIN SYRUP 100MG/ML 60M");
		finishedGoodRepository.save(coffee);
		
		FinishedGood bottledWater = new FinishedGood();
		bottledWater.setCode("BW1");
		bottledWater.setName("LAKTRAZINE 48% WSP");
		finishedGoodRepository.save(bottledWater);
		
		FinishedGood softDrinks = new FinishedGood();
		softDrinks.setCode("SD1");
		softDrinks.setName("DOXYVET PLAIN WSP TBPI");
		finishedGoodRepository.save(softDrinks);

		
	}

}
