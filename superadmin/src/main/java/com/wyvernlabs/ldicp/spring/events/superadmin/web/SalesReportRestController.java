package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.time.Month;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductCategory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductDivision;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductCategoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductDivisionRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesSlipRepository;

@RestController
@RequestMapping("/rest/sales-reports")
public class SalesReportRestController {
	@Autowired
	private SalesSlipRepository salesSlipRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductCategoryRepository categoryRepository;
	@Autowired
	private ProductDivisionRepository divisionRepository;

	@RequestMapping("/item-sales-report/depot/{depotId}/start/{startDate}/end/{endDate}/item/{itemId}")
	public Map<String, Object> itemSalesReportAmount(@PathVariable Long depotId, @PathVariable Date startDate,
			@PathVariable Date endDate, @PathVariable Long itemId) {
		Depot depot = depotRepository.getOne(depotId);
		Product product = productRepository.getOne(itemId);
		List<SalesSlip> salesSlips = salesSlipRepository.findByDepotAndDateBetween(depot, startDate, endDate);
		int quantity = 0;
		Double amount = 0D;
		Map map = new HashMap();
		for (SalesSlip salesSlip : salesSlips) {
			quantity += salesSlip.getOrderedProducts().stream().filter(op -> op.getProduct() == product)
					.mapToInt(op -> op.getQuantity()).sum();
			amount += salesSlip.getOrderedProducts().stream().filter(op -> op.getProduct() == product)
					.mapToDouble(op -> op.getAmount()).sum();
		}

		map.put("itemAmount", amount);
		map.put("itemQuantity", quantity);

		return map;
	}
	/*
	 * @RequestMapping(
	 * "/item-sales-report/depot/{depotId}/start/{startDate}/end/{endDate}/item/{itemId}")
	 * public List<Map<String, Object>> itemSalesReportAmountReport(@PathVariable
	 * Long depotId, @PathVariable Date startDate, @PathVariable Date
	 * endDate, @PathVariable Long itemId){ Depot depot =
	 * depotRepository.getOne(depotId); Product product =
	 * productRepository.getOne(itemId);
	 * 
	 * List list = new ArrayList(); /* for(int i = startDate.getMonth(); i <
	 * endDate.getMonth() ; i++) { List<SalesSlip> salesSlips =
	 * salesSlipRepository.findByDepotAndMonthDate(depot, i); int quantity = 0;
	 * Double amount = 0D; Map map = new HashMap(); for(SalesSlip salesSlip :
	 * salesSlips) { quantity += salesSlip.getOrderedProducts().stream().filter(op
	 * -> op.getProduct() == product).mapToInt(op -> op.getQuantity()).sum(); amount
	 * += salesSlip.getOrderedProducts().stream().filter(op -> op.getProduct() ==
	 * product).mapToDouble(op -> op.getAmount()).sum(); } map.put("item",
	 * product.getFinishedGood().getName()); map.put("quantity", quantity);
	 * map.put("amount", amount); list.add(map); }
	 * 
	 * return list; }
	 * 
	 * @RequestMapping(
	 * "/item-sales-report/depot/{depotId}/start/{startDate}/end/{endDate}/category/{categoryId}/division/{divisionId}")
	 * public Map<String, Object> itemSalesReportAmount(@PathVariable Long
	 * depotId, @PathVariable Date startDate, @PathVariable Date
	 * endDate, @PathVariable Long categoryId, @PathVariable Long divisionId){ Depot
	 * depot = depotRepository.getOne(depotId); ProductCategory category =
	 * categoryRepository.getOne(categoryId); ProductDivision division =
	 * divisionRepository.getOne(divisionId); List<SalesSlip> salesSlips =
	 * salesSlipRepository.findByDepotAndDateBetween(depot, startDate, endDate); int
	 * quantity = 0; Double amount = 0D; Map map = new HashMap(); for(SalesSlip
	 * salesSlip : salesSlips) { quantity +=
	 * salesSlip.getOrderedProducts().stream().filter(op ->
	 * op.getProduct().getCategory() == category && op.getProduct().getDivision() ==
	 * division).mapToInt(op -> op.getQuantity()).sum(); amount +=
	 * salesSlip.getOrderedProducts().stream().filter(op ->
	 * op.getProduct().getCategory() == category && op.getProduct().getDivision() ==
	 * division).mapToDouble(op -> op.getAmount()).sum(); }
	 * 
	 * map.put("itemAmount", amount); map.put("itemQuantity", quantity);
	 * 
	 * return map; }
	 */
}
