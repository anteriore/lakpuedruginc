package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderRepository;

@Service
public class SalesOrderService {
	@Autowired
	private SalesOrderRepository salesOrderRepository;

	@Transactional
	public SalesOrder saveSalesOrder(SalesOrder salesOrder) {
		for (SalesOrderProduct soProduct : salesOrder.getProducts()) {
			soProduct.setSoNumber(salesOrder.getNumber());
			soProduct.setCompany(salesOrder.getCompany());
			soProduct.setQuantityRemaining(soProduct.getQuantity());

			System.out.println(salesOrder.getNumber());
		}


		Long id = salesOrderRepository.getMaxId();
		//di sya number dapat sales order so number
		if (id == null) {
			salesOrder.setNumber("SO-1");
		} else {
			salesOrder.setNumber("SO-" +( ++id));
		}

		if(salesOrder.getId()!=null){
			salesOrder.setNumber("SO-"+salesOrder.getId());
		}

		
		return salesOrderRepository.save(salesOrder);
	}
}
