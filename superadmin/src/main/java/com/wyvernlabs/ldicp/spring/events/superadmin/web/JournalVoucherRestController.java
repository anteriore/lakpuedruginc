package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JournalVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.JournalVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VendorRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.JournalVoucherService;

@RestController
@RequestMapping("rest/journal-vouchers")
public class JournalVoucherRestController {
	@Autowired
	private JournalVoucherRepository journalVoucherRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private JournalVoucherService journalVoucherService;
	@Autowired
	private VoucherRepository voucherRepository;
	@Autowired
	private VendorRepository vendorRepository;
	
	@GetMapping("/{id}")
	public JournalVoucher get(@PathVariable Long id) {
		return journalVoucherRepository.getOne(id);
	}

	@GetMapping()
	public List<JournalVoucher> list() {
		return journalVoucherRepository.findAll();
	}

	@PostMapping()
	public JournalVoucher upsert(@RequestBody JournalVoucher vendor) {
		
		return journalVoucherService.saveJournalVoucher(vendor);
	}

	@GetMapping("/company/{companyId}")
	public List<JournalVoucher> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return journalVoucherRepository.findByCompany(company);
	}
	
	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		journalVoucherRepository.delete(id);
		return true;
	}
	
	
	@PostMapping("/approve/{jvId}/user/{userId}")
	public JournalVoucher approve(@PathVariable Long jvId, @PathVariable Long userId) {
		return journalVoucherService.approve(jvId, userId);
	}
	
	@GetMapping("/company/{companyId}/voucher/{voucherId}/adjustments")
	public List<JournalVoucher> getAdjustmentsOfVoucherByCompany(@PathVariable Long companyId, @PathVariable Long voucherId){
		Company company = companyRepository.findOne(companyId);
		
		return journalVoucherRepository.findByCompanyAndVoucher(company, voucherRepository.findOne(voucherId));
	}
	
	@GetMapping("/company/{companyId}/vendor/{vendorId}/status/{status}/journal-vouchers-no-adjustment")
	public List<JournalVoucher> listJvWithNoAdjustmentByCompanyAndVendorAndStatus(@PathVariable Long companyId, @PathVariable Long vendorId, @PathVariable String status){
		Company company = companyRepository.findOne(companyId);
		Vendor vendor = vendorRepository.findOne(vendorId);
		return journalVoucherRepository.findByCompanyAndVendorAndStatusAndHasAdjustment(company, vendor, status, false);
	}
	
	@GetMapping("/company/{companyId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getByCompanyAndDates(@PathVariable Long companyId, @PathVariable Date startDate, @PathVariable Date endDate){
		Company company = companyRepository.findOne(companyId);
		List<JournalVoucher> vpList = journalVoucherRepository.findByCompanyAndDateBetween(company, startDate, endDate);
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
	
	@GetMapping("/journal-report/company/{companyId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getJournalReportByCompanyAndDates(@PathVariable Long companyId, @PathVariable Date startDate, @PathVariable Date endDate){
		Company company = companyRepository.findOne(companyId);
		List<JournalVoucher> vpList = journalVoucherRepository.findByCompanyAndDateBetween(company, startDate, endDate);
		List<Map<String, Object>> vpMapList = new ArrayList();
		vpList.forEach(elt -> {
			Map<String, Object>  map = new LinkedHashMap();
			map.put("date", new SimpleDateFormat("yyyy-MM-dd").format(elt.getDate()));
			map.put("drsi", elt.getDrNumber());
			map.put("po", elt.getPoNumber());
			map.put("rr", elt.getRrNumber());
			map.put("number", elt.getNumber());
			map.put("accountTitles", elt.getAccountTitles().stream().map(elt2 -> 
			{
				Map accountTitleMap = new HashMap();
				accountTitleMap.put("title", elt2.getAccountTitle().getTitle());
				accountTitleMap.put("credit", elt2.getAccountTitle().getType() == "Credit" ? elt2.getAmount() : "");
				accountTitleMap.put("debit", elt2.getAccountTitle().getType() == "Debit" ? elt2.getAmount() : "");
				return accountTitleMap;
			}).collect(Collectors.toList()));
			map.put("amount", elt.getTotalAmount());
			vpMapList.add(map);
		});
		
		return vpMapList;
	}
}
