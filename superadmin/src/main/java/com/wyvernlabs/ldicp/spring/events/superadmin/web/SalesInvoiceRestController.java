package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesInvoice;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesInvoiceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.SalesSlipService;

@RestController
@RequestMapping("rest/sales-invoices")
public class SalesInvoiceRestController {
    @Autowired
    private SalesInvoiceRepository salesInvoiceRepository;
    @Autowired
    private SalesSlipService salesSlipService;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private DepotRepository depotRepository;

    @GetMapping("/{id}")
    public SalesInvoice get(@PathVariable Long id) {
        return salesInvoiceRepository.getOne(id);
    }

    @GetMapping()
    public List<SalesInvoice> list() {
        return salesInvoiceRepository.findAll();
    }

    @PostMapping()
    public SalesInvoice upsert(@RequestBody SalesInvoice finishedGood) {
        return (SalesInvoice) salesSlipService.saveSalesSlip(finishedGood);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        salesInvoiceRepository.deleteById(id);
        return true;
    }

    @GetMapping("/company/{id}")
    public List<SalesInvoice> getByCompany(@PathVariable Long id) {
        Company company = companyRepository.getOne(id);
        return salesInvoiceRepository.findByCompany(company);
    }

    @GetMapping("/depot/{id}")
    public List<SalesInvoice> listByDepot(@PathVariable Long id) {
        Depot depot = depotRepository.getOne(id);
        return salesInvoiceRepository.findByDepot(depot);
    }

    @GetMapping("/depot/{id}/dateFrom/{dateFrom}/dateTo/{dateTo}")
    public List<SalesInvoice> listByDepot(@PathVariable Long id, @PathVariable Date dateFrom,
            @PathVariable Date dateTo) {
        Depot depot = depotRepository.getOne(id);

        return salesInvoiceRepository.findByDepotBetweenDates(depot, dateFrom, dateTo);
    }

}
