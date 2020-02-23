package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MemoSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MemoSlipRepository;

@RestController
@RequestMapping("rest/memo-slips")
public class MemoSlipRestController {
	private static final Logger logger = LoggerFactory.getLogger(MemoSlipRestController.class);
	@Autowired
	private MemoSlipRepository memoSlipRepository;
	@Autowired
	private DepotRepository depotRepository;
	
	@GetMapping("/report/depot/{depotId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getCMDMReport(@PathVariable Long depotId, @PathVariable Date startDate, @PathVariable Date endDate){
		Depot depot = depotRepository.findOne(depotId);
		List<MemoSlip> memoSlips = memoSlipRepository.findByDepot(depot);
		return memoSlips.stream().map(memoSlip -> {
			Map map = new LinkedHashMap();
			map.put("number", memoSlip.getNumber());
			map.put("type", memoSlip.getType().getName());
			map.put("date", new SimpleDateFormat("yyyy-MM-dd").format(memoSlip.getDate()));
			map.put("client", memoSlip.getReference().getSalesOrder().getClient().getName());
			map.put("osdr", memoSlip.getReference().getType());
			map.put("amount", memoSlip.getAmount());
			map.put("remarks", memoSlip.getRemarks());
			return map;
		}).collect(Collectors.toList());
	}

}
