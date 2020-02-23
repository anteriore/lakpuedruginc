package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CancelSalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CancelSalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderRepository;

@Service
public class CancelSalesOrderProductService {
	@Autowired
	private CancelSalesOrderProductRepository cancelSalesOrderProductRepository;
	@Autowired
	private SalesOrderProductRepository salesOrderProductRepository;
	@Autowired
	private SalesOrderRepository salesOrderRepository;
	
	@Transactional
	public CancelSalesOrderProduct cancelSalesOrderProduct(CancelSalesOrderProduct cancelSalesOrderProduct) {
		SalesOrderProduct soProduct = salesOrderProductRepository.findOne(cancelSalesOrderProduct.getSalesOrderProduct().getId());
		soProduct.setStatus("Cancelled");
		System.out.println("ASD" + cancelSalesOrderProduct.getSalesOrderProduct().getSoNumber());
		SalesOrder so = salesOrderRepository.findByNumber(cancelSalesOrderProduct.getSalesOrderProduct().getSoNumber());
		if(so.allProductsCancelled()) {
			so.setStatus("Cancelled");
		}
		salesOrderRepository.save(so);
		salesOrderProductRepository.save(soProduct);
		return cancelSalesOrderProductRepository.save(cancelSalesOrderProduct);
	}
}
