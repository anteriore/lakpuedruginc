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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PromoSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PromoSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.SalesSlipService;

@RestController
@RequestMapping("rest/promo-slips")
public class PromoSlipRestController {
	@Autowired
	private PromoSlipRepository promoSlipRepository;
	@Autowired
	private SalesSlipService salesSlipService;
	@Autowired
	private CompanyRepository companyRepository;
	@GetMapping("/{id}")
    public PromoSlip get(@PathVariable Long id) {
        return promoSlipRepository.getOne(id);
    }

    @GetMapping()
    public List<PromoSlip> list() {
        return promoSlipRepository.findAll();
    }

    @PostMapping()
    public PromoSlip upsert(@RequestBody PromoSlip finishedGood) {
        return (PromoSlip) salesSlipService.saveSalesSlip(finishedGood);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		promoSlipRepository.delete(id);
		return true;
	}
    
    @GetMapping("/company/{id}")
    public List<PromoSlip> getByCompany(@PathVariable Long id) {
    	Company company = companyRepository.findOne(id);
        return promoSlipRepository.findByCompany(company);
    }
}
