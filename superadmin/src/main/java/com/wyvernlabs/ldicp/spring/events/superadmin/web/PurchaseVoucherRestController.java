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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VendorRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.PurchaseVoucherService;

@RestController
@RequestMapping("rest/purchase-vouchers")
public class PurchaseVoucherRestController {
	@Autowired
	private PurchaseVoucherRepository purchaseVoucherRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private PurchaseVoucherService purchaseVoucherService;
	@Autowired
	private VendorRepository vendorRepository;
	
	@GetMapping("/{id}")
	public PurchaseVoucher get(@PathVariable Long id) {
		return purchaseVoucherRepository.getOne(id);
	}

	@GetMapping()
	public List<PurchaseVoucher> list() {
		return purchaseVoucherRepository.findAll();
	}

	@PostMapping()
	public PurchaseVoucher upsert(@RequestBody PurchaseVoucher vendor) {
		
		return purchaseVoucherService.savePurchaseVoucher(vendor);
	}

	@GetMapping("/company/{companyId}")
	public List<PurchaseVoucher> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return purchaseVoucherRepository.findByCompany(company);
	}
	
	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		purchaseVoucherRepository.delete(id);
		return true;
	}
	/*
	@GetMapping("/company/{companyId}/rr-number/{rrNumber}/id/{id}")
	public boolean isRrNumberValid(@PathVariable Long companyId, @PathVariable String rrNumber, @PathVariable Long id) {
		Company company = companyRepository.findOne(companyId);
		PurchaseVoucher pv = purchaseVoucherRepository.findOne(id);
		return purchaseVoucherService.isRrNumberValid(rrNumber, company, pv);
	}*/
	
	@GetMapping("/company/{companyId}/rr-number/{rrNumber}")
	public boolean isRrNumberValid(@PathVariable Long companyId, @PathVariable String rrNumber) {
		Company company = companyRepository.findOne(companyId);
		return purchaseVoucherService.isRrNumberValid(rrNumber, company);
	}
	
	@PostMapping("/approve/{pvId}/user/{userId}")
	public PurchaseVoucher approve(@PathVariable Long pvId, @PathVariable Long userId) {
		return purchaseVoucherService.approvePurchaseVoucher(pvId, userId);
	}
	
	@GetMapping("/company/{companyId}/number/{number}")
	public Long getIdByCompanyAndNumber(@PathVariable Long companyId, @PathVariable String number) {
		Company company = companyRepository.findOne(companyId);
		return purchaseVoucherRepository.findByCompanyAndNumber(company, number).getId();
	}
	
	@GetMapping("/company/{companyId}/vendor/{vendorId}/status/{status}/purchase-vouchers-no-adjustment")
	public List<PurchaseVoucher> listPvWithNoAdjustmentByCompanyAndVendor(@PathVariable Long companyId, @PathVariable Long vendorId, @PathVariable String status){
		Company company = companyRepository.findOne(companyId);
		Vendor vendor = vendorRepository.findOne(vendorId);
		return purchaseVoucherRepository.findByCompanyAndVendorAndStatusAndHasAdjustment(company, vendor, status, false);
	}
	
	@GetMapping("/company/{companyId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getByCompanyAndDates(@PathVariable Long companyId, @PathVariable Date startDate, @PathVariable Date endDate){
		Company company = companyRepository.findOne(companyId);
		List<PurchaseVoucher> vpList = purchaseVoucherRepository.findByCompanyAndDateBetween(company, startDate, endDate);
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
