package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReturnSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReturnSlipRepository;

@Service
public class ReturnSlipService {
	@Autowired
	private ReturnSlipRepository returnSlipRepository;
	@Autowired
	private ProductInventoryRepository productInventoryRepository;
	
	@Transactional
	public ReturnSlip saveReturnSlip(ReturnSlip returnSlip) {
		returnSlip.getReturnSlipProducts().forEach(product -> {
			ProductInventory inventory = productInventoryRepository.findByProductAndDepot(product.getProduct(), returnSlip.getDepot());
			inventory.add(product.getGoodQuantity());
			productInventoryRepository.save(inventory);
		});
		return returnSlipRepository.save(returnSlip);
	}
}
