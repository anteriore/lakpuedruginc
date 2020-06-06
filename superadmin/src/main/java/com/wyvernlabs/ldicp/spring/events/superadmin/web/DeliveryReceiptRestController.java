package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.DeliveryReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DeliveryReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.DeliveryReceiptService;

@RestController
@RequestMapping("rest/delivery-receipts")
public class DeliveryReceiptRestController {
    @Autowired
    private DeliveryReceiptRepository deliveryReceiptRepository;
    @Autowired
    private DeliveryReceiptService deliveryReceiptService;
    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping("/{id}")
    public DeliveryReceipt get(@PathVariable Long id) {
        return deliveryReceiptRepository.getOne(id);
    }

    @GetMapping()
    public List<DeliveryReceipt> list() {
        return deliveryReceiptRepository.findAll();
    }

    @PostMapping()
    public DeliveryReceipt upsert(@RequestBody DeliveryReceipt finishedGood) {
        return deliveryReceiptService.saveDeliveryReceipt(finishedGood);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        deliveryReceiptRepository.deleteById(id);
        return true;
    }

    @GetMapping("/company/{id}")
    public List<DeliveryReceipt> getByCompany(@PathVariable Long id) {
        Company company = companyRepository.getOne(id);
        return deliveryReceiptRepository.findByCompany(company);
    }
}
