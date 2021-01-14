package com.wyvernlabs.ldicp.spring.events.superadmin.web.dashboard;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Product;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;

@RestController
@RequestMapping("rest/product-inventory")
public class ProductInventoryRestController {
	private static final Logger logger = LoggerFactory.getLogger(ProductInventoryRestController.class);
	@Autowired
	private ProductInventoryRepository productInventoryRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private FinishedGoodRepository finishedGoodRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private CompanyRepository companyRepository;

	@GetMapping("/{id}")
	public ProductInventory get(@PathVariable Long id) {
		return productInventoryRepository.getOne(id);
	}

	@GetMapping()
	public List<ProductInventory> list() {
		return productInventoryRepository.findAll();
	}

	@PostMapping()
	public ProductInventory upsert(@RequestBody ProductInventory item) {
		return productInventoryRepository.save(item);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		productInventoryRepository.deleteById(id);
		return true;
	}

	@GetMapping("/depot/{depotId}")
	public List<ProductInventory> listByDepot(@PathVariable Long depotId) {
		Depot depot = depotRepository.getOne(depotId);
		return productInventoryRepository.findByDepot(depot);
	}

	@GetMapping("/company/{companyId}/view")
	public List<Map<String, Object>> listByCompanyView(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return productInventoryRepository.findSumQuantityByCompanyGroupByFinishedGood(company);
	}

	@GetMapping("/company/{companyId}/view/fg-modal")
	public List<Map<String, Object>> listByCompanyViewForFgModal(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		List<FinishedGood> fgList = finishedGoodRepository.findAll();
		List<FinishedGood> finishedGoodInventoryViewList = new ArrayList();
		List<Map<String, Object>> productInventoryViewList = productInventoryRepository
				.findSumQuantityByCompanyGroupByFinishedGoodId(company);
		List<Map<String, Object>> finishedGoodModalList = new ArrayList();

		for (Map<String, Object> productInventory : productInventoryViewList) {
			finishedGoodInventoryViewList.add((FinishedGood) productInventory.get("finishedGood"));
		}

		finishedGoodModalList.addAll(productInventoryViewList);
		fgList.removeAll(finishedGoodInventoryViewList);

		for (FinishedGood fg : fgList) {
			Map<String, Object> map = new HashMap();
			map.put("finishedGood", fg);
			map.put("sum", 0);
			finishedGoodModalList.add(map);
		}
		return finishedGoodModalList;
	}

	@GetMapping("/company/{companyId}/depot/{depotId}/view")
	public List<Map<String, Object>> listByCompanyDepotView(@PathVariable Long companyId, @PathVariable Long depotId) {
		Company company = companyRepository.getOne(companyId);
		Depot depot = depotRepository.getOne(depotId);
		return productInventoryRepository.findSumQuantityByCompanyAndDepotGroupByFinishedGood(company, depot);
	}

	// @GetMapping("/company/{companyId}/depot/{depotId}/report")
	// public List<Map<String, Object>> listByCompanyDepotReport(@PathVariable Long
	// companyId,
	// @PathVariable Long depotId) {
	// Company company = companyRepository.getOne(companyId);
	// Depot depot = depotRepository.getOne(depotId);
	// List<Map<String, Object>> mapList = productInventoryRepository
	// .findSumQuantityByCompanyAndDepotGroupByFinishedGood(company, depot);

	// return mapList.stream().map(obj -> {
	// Map map = new LinkedHashMap();
	// Product product = (Product) obj.get("product");
	// map.put("code", product.getFinishedGood().getCode());
	// map.put("fg", product.getFinishedGood().getName());
	// map.put("unit", product.getSmallUnit().getCode() + "/" +
	// product.getBigUnit().getCode());
	// map.put("quantity", obj.get("sum"));
	// return map;
	// }).collect(Collectors.toList());
	// }

	@GetMapping("/company/{companyId}")
	public List<ProductInventory> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return productInventoryRepository.findByCompany(company);
	}

	@GetMapping("/company/{companyId}/finished-good/{finishedGoodId}")
	public List<ProductInventory> listByCompanyAndFinishedGood(@PathVariable Long companyId,
			@PathVariable Long finishedGoodId) {
		Company company = companyRepository.getOne(companyId);
		FinishedGood fg = finishedGoodRepository.getOne(finishedGoodId);
		return productInventoryRepository.findByCompanyAndFinishedGood(company, fg);
	}

	@GetMapping("/depot/{depotId}/finished-good/{finishedGoodId}")
	public List<ProductInventory> listByDepotAndFinishedGood(@PathVariable Long depotId,
			@PathVariable Long finishedGoodId) {
		Depot depot = depotRepository.getOne(depotId);
		FinishedGood fg = finishedGoodRepository.getOne(finishedGoodId);
		return productInventoryRepository.findByDepotAndFinishedGood(depot, fg);
	}

}
