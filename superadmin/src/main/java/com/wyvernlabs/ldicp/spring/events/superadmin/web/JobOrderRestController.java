package com.wyvernlabs.ldicp.spring.events.superadmin.web;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JobOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.JobOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MoInventoryRepository;

@RestController
@RequestMapping("rest/job-orders")
public class JobOrderRestController {
    private static final Logger logger = LoggerFactory.getLogger(JobOrderRestController.class);
    
    @Autowired
    private JobOrderRepository jobOrderRepository;
    @Autowired
    private MoInventoryRepository moInventoryRepository;
    
    @GetMapping("/{id}")
    public JobOrder get(@PathVariable Long id) {
        return jobOrderRepository.getOne(id);
    }

    @GetMapping("/moInventory/{moInventoryId}")
    public List<JobOrder> listByMoInventory(@PathVariable Long moInventoryId) {
        MoInventory moInventory = moInventoryRepository.findOne(moInventoryId);
        return jobOrderRepository.findByMoInventory(moInventory);
    }

    @GetMapping()
    public List<JobOrder> list() {
        return jobOrderRepository.findAll();
    }

    @PostMapping()
    public List<JobOrder> upsert(@RequestBody List<JobOrder> jobOrders) {
        return jobOrderRepository.save(jobOrders);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		jobOrderRepository.delete(id);
		return true;
    }
}
