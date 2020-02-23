package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AcknowledgementReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AcknowledgementReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.OrderReceiptRepository;

@RestController
@RequestMapping("/rest/order-receipts")
public class OrderReceiptRestController {
	@Autowired
	private OrderReceiptRepository orderReceiptRepository;
	@Autowired
	private DepotRepository depotRepository;
	@Autowired
	private AcknowledgementReceiptRepository arRepository;
	@GetMapping("/{id}")
    public OrderReceipt get(@PathVariable Long id) {
        return orderReceiptRepository.getOne(id);
    }

    @GetMapping()
    public List<OrderReceipt> list() {
        return orderReceiptRepository.findAll();
    }

    @PostMapping()
    @Transactional
    public OrderReceipt upsert(@RequestBody OrderReceipt or) {
    	AcknowledgementReceipt ar = arRepository.findOne(or.getAcknowledgementReceipt().getId());
    	ar.setStatus("OR Created");
    	arRepository.save(ar);
    	return orderReceiptRepository.save(or);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		orderReceiptRepository.delete(id);
		return true;
	}
    
    @GetMapping("/depot/{depotId}")
    public List<OrderReceipt> listByDepot(@PathVariable Long depotId) {
    	Depot depot = depotRepository.findOne(depotId);
        return orderReceiptRepository.findByDepot(depot);
    }
}
