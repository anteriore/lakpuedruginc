package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderedProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesInvoice;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesInvoiceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderRepository;

@Service
@Transactional
public class SalesInvoiceService {
	@Autowired
	private SalesInvoiceRepository salesInvoiceRepository;
	@Autowired
	private SalesOrderProductRepository salesOrderProductRepository;
	@Autowired
	private SalesOrderRepository salesOrderRepository;

	@Transactional
	public SalesInvoice saveSalesInvoice(SalesInvoice salesInvoice) {
		for (OrderedProduct salesInvoiceProduct : salesInvoice.getOrderedProducts()) {
			salesInvoiceProduct.setOrderSlipNo(salesInvoice.getNumber());
			SalesOrderProduct salesOrderProduct = salesOrderProductRepository
					.getOne(salesInvoiceProduct.getSalesOrderProductId());
			salesInvoiceProduct.setUnitPrice(salesOrderProduct.getUnitPrice());
			if (salesOrderProduct.getStatus().equals("Pending")) {
				if (salesInvoiceProduct.getQuantity() >= salesOrderProduct.getQuantityRequested()) {
					salesOrderProduct.setStatus("In Transit");
				} else {
					salesOrderProduct.setStatus("Incomplete");
					salesOrderProduct.setQuantityRemaining(
							salesInvoiceProduct.getQuantity() - salesOrderProduct.getQuantityRequested());
				}
			} else if (salesOrderProduct.getStatus().equals("Incomplete")) {
				if (salesInvoiceProduct.getQuantity() >= salesOrderProduct.getQuantityRemaining()) {
					salesOrderProduct.setStatus("In Transit");
				} else {
					salesOrderProduct.setQuantityRemaining(
							salesInvoiceProduct.getQuantity() - salesOrderProduct.getQuantityRequested());
				}
			}
		}

		SalesOrder so = salesOrderRepository.getOne(salesInvoice.getSalesOrder().getId());
		if (so.allProductsInTransit()) {
			so.setStatus("In Transit");
			salesOrderRepository.save(so);
		}
		return salesInvoiceRepository.save(salesInvoice);
	}
}
