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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.VouchersPayable;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VendorRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VouchersPayableRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.VouchersPayableService;

@RestController
@RequestMapping("rest/vouchers-payables")
public class VouchersPayableRestController {
	@Autowired
	private VouchersPayableRepository vouchersPayableRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private VouchersPayableService vouchersPayableService;
	@Autowired
	private VendorRepository vendorRepository;
	
	@GetMapping("/{id}")
	public VouchersPayable get(@PathVariable Long id) {
		return vouchersPayableRepository.getOne(id);
	}

	@GetMapping()
	public List<VouchersPayable> list() {
		return vouchersPayableRepository.findAll();
	}

	@PostMapping()
	public VouchersPayable upsert(@RequestBody VouchersPayable vouchersPayable) {
		return vouchersPayableService.saveVouchersPayable(vouchersPayable);
	}

	@GetMapping("/company/{companyId}")
	public List<VouchersPayable> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return vouchersPayableRepository.findByCompany(company);
	}
	
	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		vouchersPayableRepository.delete(id);
		return true;
	}
	
	@PostMapping("/approve/{vpId}/user/{userId}")
	public VouchersPayable approve(@PathVariable Long vpId, @PathVariable Long userId) {
		return vouchersPayableService.approveVouchersPayable(vpId, userId);
	}
	
	@GetMapping("/company/{companyId}/vendor/{vendorId}/status/{status}")
	public List<VouchersPayable> listByCompanyAndVendor(@PathVariable Long companyId, @PathVariable Long vendorId, @PathVariable String status){
		Vendor vendor = vendorRepository.findOne(vendorId);
		Company company = companyRepository.findOne(companyId);
		return vouchersPayableRepository.findByCompanyAndVendorAndStatus(company, vendor, status);
	}
	
	@GetMapping("/company/{companyId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getByCompanyAndDates(@PathVariable Long companyId, @PathVariable Date startDate, @PathVariable Date endDate){
		Company company = companyRepository.findOne(companyId);
		List<VouchersPayable> vpList = vouchersPayableRepository.findByCompanyAndDateBetween(company, startDate, endDate);
		List<Map<String, Object>> vpMapList = new ArrayList();
		vpList.forEach(elt -> {
			Map<String, Object>  map = new LinkedHashMap();
			map.put("number", elt.getNumber());
			map.put("date", new SimpleDateFormat("yyyy-MM-dd").format(elt.getDate()));
			map.put("payee", elt.getVendor().getName());
			map.put("amount", elt.getTotalAmount());
			map.put("status", elt.getStatus());
			vpMapList.add(map);
		});
		
		return vpMapList;
	}
}
