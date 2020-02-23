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
		cornedTuna.setName("Corned Tuna");
		finishedGoodRepository.save(cornedTuna);
		
		FinishedGood spicyTuna = new FinishedGood();
		spicyTuna.setCode("ST1");
		spicyTuna.setName("Spicy Tuna");
		finishedGoodRepository.save(spicyTuna);
		
		FinishedGood coffee = new FinishedGood();
		coffee.setCode("CO1");
		coffee.setName("Coffee");
		finishedGoodRepository.save(coffee);
		
		FinishedGood bottledWater = new FinishedGood();
		bottledWater.setCode("BW1");
		bottledWater.setName("Bottled Water");
		finishedGoodRepository.save(bottledWater);
		
		FinishedGood softDrinks = new FinishedGood();
		softDrinks.setCode("SD1");
		softDrinks.setName("Soft Drinks");
		finishedGoodRepository.save(softDrinks);
	}

}
