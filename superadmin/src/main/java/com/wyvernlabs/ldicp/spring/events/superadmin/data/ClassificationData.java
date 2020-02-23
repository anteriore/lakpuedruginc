package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Classification;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.ClassificationType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClassificationRepository;

@Component
public class ClassificationData {
	@Autowired
	private ClassificationRepository classificationRepository;
	
	public void init() {
		Classification c1 = new Classification();
		c1.setName("Over The Counter");
		c1.setCode("OTC");
//		c1.setType(ClassificationType.PRODUCT);
		classificationRepository.save(c1);
		
		Classification c2 = new Classification();
		c2.setName("LO");
		c2.setCode("Logistics");
//		c2.setType(ClassificationType.NONE);
		classificationRepository.save(c2);
		
		Classification c3 = new Classification();
		c3.setName("BO");
		c3.setCode("Back Office");
//		c3.setType(ClassificationType.NONE);
		classificationRepository.save(c3);
		
	}
}
