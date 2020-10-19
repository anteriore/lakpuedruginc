package com.wyvernlabs.ldicp.spring.events.superadmin.web.sales;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CancelSalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.CancelSalesOrderProductService;

@RestController
@RequestMapping("api/sales-order-products")
public class SalesOrderProductRestController {
	private static final Logger logger = LoggerFactory.getLogger(SalesOrderProductRestController.class);
	@Autowired
	private CancelSalesOrderProductService cancelSalesOrderProductService;
	@Autowired
	private SalesOrderProductRepository salesOrderProductRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private SalesOrderRepository salesOrderRepository;
	@Autowired
	private ProductInventoryRepository productInventoryRepository;
	@Autowired
	private FinishedGoodRepository finishedGoodRepository;

	@PostMapping("/cancel")
	public CancelSalesOrderProduct cancelSalesOrderProduct(
			@RequestBody CancelSalesOrderProduct cancelSalesOrderProduct) {
		return cancelSalesOrderProductService.cancelSalesOrderProduct(cancelSalesOrderProduct);
	}

	@GetMapping("/so/{soNumber}")
	public List<ProductInventory> listBySoNumber(@PathVariable String soNumber) {
		SalesOrder so = salesOrderRepository.findByNumber(soNumber);
		logger.info(so.toString());
		List<SalesOrderProduct> soProductList = salesOrderProductRepository.findByDepotAndSoNumber(so.getDepot(),
				soNumber);
		logger.info(soProductList.toString());
		List<ProductInventory> productInventoryList = new ArrayList();
		for (SalesOrderProduct soProduct : soProductList) {
			productInventoryList.addAll(
					productInventoryRepository.findByDepotAndFinishedGood(so.getDepot(), soProduct.getFinishedGood()));
		}

		return productInventoryList;
	}

	@GetMapping("/fg/{fgId}/depot/{depotId}/reserved-quantity")
	public int getReservedQuantityOfFG(@PathVariable Long fgId, @PathVariable Long depotId) {
		FinishedGood fg = finishedGoodRepository.getOne(fgId);
		Depot depot = depotRepository.getOne(depotId);
		String[] status = { "Pending", "Incomplete" };
		List<SalesOrderProduct> soProductList = salesOrderProductRepository
				.findByStatusInAndDepotAndFinishedGood(status, depot, fg);
		int sum = 0;
		for (SalesOrderProduct soProduct : soProductList) {
			if (soProduct.getStatus().equals("Pending")) {
				sum += soProduct.getQuantity();
			} else if (soProduct.getStatus().equals("Incomplete")) {
				sum += soProduct.getQuantity() - soProduct.getQuantityRemaining();
			}
		}

		return sum;
	}
}
