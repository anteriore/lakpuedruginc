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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Client;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClientRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.OrderSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesInvoiceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesSlipRepository;

@RestController
@RequestMapping("rest/sales-slips")
public class SalesSlipRestController {
	@Autowired
	private OrderSlipRepository orderSlipRepository;
	@Autowired
	private SalesInvoiceRepository salesInvoiceRepository;
	@Autowired
	private ClientRepository clientRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private SalesSlipRepository salesSlipRepository;
	
	@GetMapping("/depot/{depotId}")
	public List<SalesSlip> listByDepot(@PathVariable Long depotId){
		Depot depot = depotRepository.findOne(depotId);
		return salesSlipRepository.findByDepot(depot);
	}
	
	@GetMapping("/depot/{depotId}/client/{clientId}/status/{status}")
    public List<SalesSlip> listByDepotAndClientAndStatus(
    		@PathVariable Long depotId,
    		@PathVariable Long clientId,
    		@PathVariable String[] status) {
    	Depot depot = depotRepository.findOne(depotId);
    	Client client = clientRepository.findOne(clientId);
    	List<SalesSlip> salesSlips = new ArrayList<>();
    	salesSlips.addAll(orderSlipRepository.findByDepotAndClientAndStatus(depot, client, status));
        salesSlips.addAll(salesInvoiceRepository.findByDepotAndClientAndStatus(depot, client, status));
        return salesSlips;
	}
	
	@GetMapping("/depot/{depotId}/status/{status}")
	public List<SalesSlip> listByDepotAndStatus(
			@PathVariable Long depotId,
			@PathVariable String[] status){
		Depot depot = depotRepository.findOne(depotId);
		List<SalesSlip> salesSlips = new ArrayList<>();
    	salesSlips.addAll(orderSlipRepository.findByDepotAndStatus(depot, status));
        salesSlips.addAll(salesInvoiceRepository.findByDepotAndStatus(depot, status));
        return salesSlips;
        
	}
	
	@GetMapping("/depot/{depotId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getByDepotAndDates(@PathVariable Long depotId, @PathVariable Date startDate, @PathVariable Date endDate){
		Depot depot = depotRepository.findOne(depotId);
		List<SalesSlip> vpList = salesSlipRepository.findByDepotAndDateBetween(depot, startDate, endDate);
		List<Map<String, Object>> vpMapList = new ArrayList();
		vpList.forEach(elt -> {
			elt.getOrderedProducts().forEach(elt2 -> {
				Map<String, Object>  map = new LinkedHashMap();
				map.put("soNumber", elt.getSalesOrder().getNumber());
				map.put("soDate", new SimpleDateFormat("yyyy-MM-dd").format(elt.getSalesOrder().getDate()));
				map.put("number", elt.getNumber());
				map.put("date", elt.getDate());
				map.put("product", elt2.getProduct().getFinishedGood().getName());
				map.put("quantity", elt2.getQuantity());
				map.put("unitPrice", elt2.getUnitPrice());
				map.put("amount", elt2.getAmount());
				map.put("lotNumber", elt2.getProduct().getLotNumber());
				vpMapList.add(map);
			});
		});
		
		return vpMapList;
	}
	
}
