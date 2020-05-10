package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderedProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.OrderSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PromoSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesInvoiceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesSlipRepository;

@Service
public class SalesSlipService {
	@Autowired
	private OrderSlipRepository orderSlipRepository;
	@Autowired
	private SalesOrderProductRepository salesOrderProductRepository;
	@Autowired
	private SalesOrderRepository salesOrderRepository;
	@Autowired
	private ProductInventoryRepository productInventoryRepository;
	@Autowired
	private SalesInvoiceRepository salesInvoiceRepository;
	@Autowired
	private PromoSlipRepository promoSlipRepository;
	@Autowired
	private SalesSlipRepository salesSlipRepository;

	@Transactional
	public SalesSlip saveSalesSlip(SalesSlip salesSlip) {
		Double totalAmount = 0D;
		for (OrderedProduct orderedProduct : salesSlip.getOrderedProducts()) {
			orderedProduct.setOrderSlipNo(salesSlip.getNumber());
			orderedProduct.setDepot(salesSlip.getDepot());

			SalesOrderProduct salesOrderProduct = salesOrderProductRepository
					.getOne(orderedProduct.getSalesOrderProductId());
			orderedProduct.setUnitPrice(salesOrderProduct.getUnitPrice());
			salesOrderProduct.deductOrderedQuantity(orderedProduct.getQuantity());
			salesOrderProductRepository.save(salesOrderProduct);

			totalAmount += orderedProduct.getQuantity() * salesOrderProduct.getUnitPrice();

			ProductInventory inventory = productInventoryRepository.findByProductAndDepot(orderedProduct.getProduct(),
					salesSlip.getDepot());
			inventory.deduct(orderedProduct.getQuantity());
			productInventoryRepository.save(inventory);
		}

		SalesOrder so = salesOrderRepository.getOne(salesSlip.getSalesOrder().getId());
		if (so.allProductsInTransit()) {
			so.setStatus("In Transit");
			salesOrderRepository.save(so);
		} else {
			if (!salesSlip.getOrderedProducts().isEmpty()) {
				so.setStatus("Incomplete");
				salesOrderRepository.save(so);
			}
		}

		salesSlip.setTotalAmount(totalAmount);

		return salesSlipRepository.save(salesSlip);
	}
}
