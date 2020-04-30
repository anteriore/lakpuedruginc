package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.DeliveryReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.DeliveredProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DeliveryReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderProductRepository;

@Service
@Transactional
public class DeliveryReceiptService {
	@Autowired
	private DeliveryReceiptRepository deliveryReceiptRepository;
	@Autowired
	private SalesOrderProductRepository salesOrderProductRepository;

	@Transactional
	public DeliveryReceipt saveDeliveryReceipt(DeliveryReceipt deliveryReceipt) {
		for (DeliveredProduct deliveredProduct : deliveryReceipt.getDeliveredProducts()) {
			deliveredProduct.setDeliveryReceiptNo(deliveryReceipt.getNumber());
			SalesOrderProduct salesOrderProduct = salesOrderProductRepository
					.getOne(deliveredProduct.getSalesOrderProductId());
			if (salesOrderProduct.getStatus().equals("Pending")) {
				if (deliveredProduct.getQuantity() >= salesOrderProduct.getQuantityRequested()) {
					salesOrderProduct.setStatus("In Transit");
				} else {
					salesOrderProduct.setStatus("Incomplete");
					salesOrderProduct.setQuantityRemaining(
							deliveredProduct.getQuantity() - salesOrderProduct.getQuantityRequested());
				}
			} else if (salesOrderProduct.getStatus().equals("Incomplete")) {
				if (deliveredProduct.getQuantity() >= salesOrderProduct.getQuantityRemaining()) {
					salesOrderProduct.setStatus("In Transit");
				} else {
					salesOrderProduct.setQuantityRemaining(
							deliveredProduct.getQuantity() - salesOrderProduct.getQuantityRequested());
				}
			}
		}

		if (deliveryReceipt.allProductsInTransit())
			deliveryReceipt.setStatus("In Transit");

		return deliveryReceiptRepository.save(deliveryReceipt);
	}
}
