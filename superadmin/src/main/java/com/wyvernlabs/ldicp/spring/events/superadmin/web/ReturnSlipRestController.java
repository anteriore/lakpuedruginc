package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReturnSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReturnSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ReturnSlipService;

@RestController
@RequestMapping("rest/return-slips")
public class ReturnSlipRestController {
	@Autowired
	private ReturnSlipService returnSlipService;
	@Autowired
	private ReturnSlipRepository returnSlipRepository;
	@Autowired
	private DepotRepository depotRepository;

	@GetMapping("/{id}")
	public ReturnSlip get(@PathVariable Long id) {
		return returnSlipRepository.getOne(id);
	}

	@GetMapping()
	public List<ReturnSlip> list() {
		return returnSlipRepository.findAll();
	}

	@PostMapping()
	public ReturnSlip upsert(@RequestBody ReturnSlip returnSlip) {
		return returnSlipService.saveReturnSlip(returnSlip);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		returnSlipRepository.deleteById(id);
		return true;
	}

	@GetMapping("/depot/{depotId}")
	public List<ReturnSlip> listByDepot(@PathVariable Long depotId) {
		Depot depot = depotRepository.getOne(depotId);
		return returnSlipRepository.findByDepot(depot);
	}

	@GetMapping("/depot/{depotId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getByDepotAndDates(@PathVariable Long depotId, @PathVariable Date startDate,
			@PathVariable Date endDate) {
		Depot depot = depotRepository.getOne(depotId);
		List<ReturnSlip> vpList = returnSlipRepository.findByDepotAndDateBetween(depot, startDate, endDate);
		List<Map<String, Object>> vpMapList = new ArrayList();
		vpList.forEach(elt -> {
			elt.getReturnSlipProducts().forEach(elt2 -> {
				Map<String, Object> map = new LinkedHashMap();
				map.put("number", elt.getNumber());
				map.put("date", new SimpleDateFormat("yyyy-MM-dd").format(elt.getDate()));
				map.put("dr", elt.getSalesNumber());
				map.put("sr", elt.getClient().getSalesRep().getName());
				map.put("client", elt.getClient().getName());
				map.put("product", elt2.getProduct().getFinishedGood().getName());
				map.put("quantity", elt2.getGoodQuantity());
				map.put("amount", elt2.getGoodQuantity() * elt2.getUnitPrice());
				vpMapList.add(map);
			});
		});

		return vpMapList;
	}

}
