package com.wyvernlabs.ldicp.spring.events.superadmin.web.sales;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AcknowledgementReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AcknowledgementReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.AcknowledgementReceiptService;

@RestController
@RequestMapping("rest/acknowledgement-receipts")
public class AcknowledgementReceiptRestController {
    @Autowired
    private AcknowledgementReceiptRepository acknowledgementReceiptRepository;
    @Autowired
    private AcknowledgementReceiptService acknowledgementReceiptService;
    @Autowired
    private DepotRepository depotRepository;
    @Autowired
    private CompanyRepository companyRepository;

    @GetMapping("/{id}")
    public AcknowledgementReceipt get(@PathVariable Long id) {
        return acknowledgementReceiptRepository.getOne(id);
    }

    @GetMapping()
    public List<AcknowledgementReceipt> list() {
        return acknowledgementReceiptRepository.findAll();
    }

    @PostMapping()
    public AcknowledgementReceipt upsert(@RequestBody AcknowledgementReceipt AcknowledgementReceipt) {
        return acknowledgementReceiptService.saveAcknowledgementReceipt(AcknowledgementReceipt);
    }

    @GetMapping("/company/{id}")
    public List<AcknowledgementReceipt> listByCompany(@PathVariable Long id) {
        Company company = companyRepository.getOne(id);
        return acknowledgementReceiptRepository.findByCompany(company);
    }

    @GetMapping("/depot/{id}")
    public List<AcknowledgementReceipt> listByDepot(@PathVariable Long id) {
        Depot depot = depotRepository.getOne(id);
        return acknowledgementReceiptRepository.findByDepot(depot);
    }

    @GetMapping("/depot/{id}/with-si")
    public List<AcknowledgementReceipt> listByDepotWithSI(@PathVariable Long id) {
        Depot depot = depotRepository.getOne(id);
        return acknowledgementReceiptRepository.findByDepot(depot).stream()
                .filter(ar -> ar.getSiAmount() > 0 && ar.getStatus().equals("Pending")).collect(Collectors.toList());
    }

}
