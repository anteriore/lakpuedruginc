package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JournalVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Voucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.JournalVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VoucherRepository;

@RestController
@RequestMapping("rest/vouchers")
public class VoucherRestController {

	@Autowired
	private VoucherRepository voucherRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private PurchaseVoucherRepository purchaseVoucherRepository;
	@Autowired
	private JournalVoucherRepository journalVoucherRepository;

	@GetMapping("/company/{companyId}/new-vouchers")
	public List<Voucher> getNewVouchersByCompanyAndStatus(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		List<Voucher> vouchers = new ArrayList<Voucher>();
		List<JournalVoucher> jvList = journalVoucherRepository.findByCompanyAndVoucher(company, null);
		List<PurchaseVoucher> pjvList = purchaseVoucherRepository.findByCompany(company);
		vouchers.addAll(pjvList);
		vouchers.addAll(jvList);
		return vouchers;
	}

	@GetMapping("/company/{companyId}/status/{status}/new-vouchers")
	public List<Voucher> getNewVouchersByCompanyAndStatus(@PathVariable Long companyId, @PathVariable String status) {
		Company company = companyRepository.getOne(companyId);
		List<Voucher> vouchers = new ArrayList<Voucher>();
		List<JournalVoucher> jvList = journalVoucherRepository.findByCompanyAndVoucherAndStatus(company, null, status);
		List<PurchaseVoucher> pjvList = purchaseVoucherRepository.findByCompanyAndStatus(company, status);
		vouchers.addAll(pjvList);
		vouchers.addAll(jvList);
		return vouchers;
	}

}
