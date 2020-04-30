package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderedProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.OrderSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderRepository;

@Service
@Transactional
public class OrderSlipService {
	@Autowired
	private OrderSlipRepository orderSlipRepository;
	@Autowired
	private SalesOrderProductRepository salesOrderProductRepository;
	@Autowired
	private SalesOrderRepository salesOrderRepository;
	@Autowired
	private ProductInventoryRepository productInventoryRepository;

	@Transactional
	public OrderSlip saveOrderSlip(OrderSlip orderSlip) {
		for (OrderedProduct orderedProduct : orderSlip.getOrderedProducts()) {
			orderedProduct.setOrderSlipNo(orderSlip.getNumber());
			SalesOrderProduct salesOrderProduct = salesOrderProductRepository
					.getOne(orderedProduct.getSalesOrderProductId());
			orderedProduct.setUnitPrice(salesOrderProduct.getUnitPrice());
			if (salesOrderProduct.getStatus().equals("Pending")) {
				if (orderedProduct.getQuantity() >= salesOrderProduct.getQuantity()) {
					salesOrderProduct.setStatus("In Transit");
				} else {
					salesOrderProduct.setStatus("Incomplete");
					salesOrderProduct
							.setQuantityRemaining(salesOrderProduct.getQuantity() - orderedProduct.getQuantity());
				}
			} else if (salesOrderProduct.getStatus().equals("Incomplete")) {
				if (orderedProduct.getQuantity() >= salesOrderProduct.getQuantityRemaining()) {
					salesOrderProduct.setStatus("In Transit");
				} else {
					salesOrderProduct
							.setQuantityRemaining(salesOrderProduct.getQuantity() - orderedProduct.getQuantity());
				}
			}
			ProductInventory inventory = productInventoryRepository.findByProductAndDepot(orderedProduct.getProduct(),
					orderSlip.getDepot());
			inventory.setQuantity(inventory.getQuantity() - orderedProduct.getQuantity());
			productInventoryRepository.save(inventory);

			orderedProduct.setDepot(orderSlip.getDepot());
		}

		SalesOrder so = salesOrderRepository.getOne(orderSlip.getSalesOrder().getId());
		if (so.allProductsInTransit()) {
			so.setStatus("In Transit");
			salesOrderRepository.save(so);
		} else {
			if (!orderSlip.getOrderedProducts().isEmpty()) {
				so.setStatus("Incomplete");
				salesOrderRepository.save(so);
			}
		}

		return orderSlipRepository.save(orderSlip);
	}
}
