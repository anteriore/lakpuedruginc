package com.wyvernlabs.ldicp.spring.events.superadmin.web.sales;

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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.OrderSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.SalesSlipService;

@RestController
@RequestMapping("rest/order-slips")
public class OrderSlipRestController {
    @Autowired
    private OrderSlipRepository orderSlipRepository;
    @Autowired
    private SalesSlipService salesSlipService;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private DepotRepository depotRepository;

    @GetMapping("/{id}")
    public OrderSlip get(@PathVariable Long id) {
        return orderSlipRepository.getOne(id);
    }

    @GetMapping()
    public List<OrderSlip> list() {
        return orderSlipRepository.findAll();
    }

    @PostMapping()
    public OrderSlip upsert(@RequestBody OrderSlip finishedGood) {
        return (OrderSlip) salesSlipService.saveSalesSlip(finishedGood);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        orderSlipRepository.deleteById(id);
        return true;
    }

    @GetMapping("/company/{id}")
    public List<OrderSlip> getByCompany(@PathVariable Long id) {
        Company company = companyRepository.getOne(id);
        return orderSlipRepository.findByCompany(company);
    }

    @GetMapping("/depot/{id}")
    public List<OrderSlip> listByDepot(@PathVariable Long id) {
        Depot depot = depotRepository.getOne(id);
        return orderSlipRepository.findByDepot(depot);
    }

    @GetMapping("/depot/{id}/dateFrom/{dateFrom}/dateTo/{dateTo}")
    public List<OrderSlip> listByDepot(@PathVariable Long id, @PathVariable Date dateFrom, @PathVariable Date dateTo) {
        Depot depot = depotRepository.getOne(id);

        return orderSlipRepository.findByDepotBetweenDates(depot, dateFrom, dateTo);
    }
}
