package com.wyvernlabs.ldicp.spring.events.superadmin.web.dashboard;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JournalVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.VouchersPayable;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AccountTitleEntryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.JournalVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VouchersPayableRepository;

@RestController
@RequestMapping("/rest/account-summary-reports")
public class AccountSummaryReportRestController {
	@Autowired
	private PurchaseVoucherRepository purchaseVoucherRepository;
	@Autowired
	private JournalVoucherRepository journalVoucherRepository;
	@Autowired
	private VouchersPayableRepository vouchersPayableRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private AccountTitleEntryRepository accountTitleEntryRepository;

	@RequestMapping("/jv/company/{companyId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getListOfJVAccountSummary(@PathVariable Date startDate, @PathVariable Date endDate,
			@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		List<JournalVoucher> jvs = journalVoucherRepository.findByCompanyAndStatusAndDateBetween(company, "Approved",
				startDate, endDate);
		List<Long> entryIds = new ArrayList<Long>();
		jvs.stream().map(pjv -> pjv.getAccountTitles()).forEach(entryList -> {
			entryList.forEach(elt -> {
				entryIds.add(elt.getId());
			});
		});

		return formatMap(entryIds);
	}

	@RequestMapping("/pjv/company/{companyId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getListOfPJVAccountSummary(@PathVariable Date startDate,
			@PathVariable Date endDate, @PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		List<PurchaseVoucher> pjvs = purchaseVoucherRepository.findByCompanyAndStatusAndDateBetween(company, "Approved",
				startDate, endDate);
		List<Long> entryIds = new ArrayList<Long>();
		pjvs.stream().map(pjv -> pjv.getAccountTitles()).forEach(entryList -> {
			entryList.forEach(elt -> {
				entryIds.add(elt.getId());
			});
		});

		return formatMap(entryIds);

	}

	@RequestMapping("/vp/company/{companyId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getListOfVPAccountSummary(@PathVariable Date startDate, @PathVariable Date endDate,
			@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		List<VouchersPayable> vps = vouchersPayableRepository.findByCompanyAndStatusAndDateBetween(company, "Approved",
				startDate, endDate);
		List<Long> entryIds = new ArrayList<Long>();
		vps.stream().map(pjv -> pjv.getAccountTitles()).forEach(entryList -> {
			entryList.forEach(elt -> {
				entryIds.add(elt.getId());
			});
		});
		return formatMap(entryIds);
	}

	private List<Map<String, Object>> formatMap(List<Long> entryIds) {
		List<Map<String, Object>> tempList = accountTitleEntryRepository
				.testfunction(entryIds.toArray(new Long[entryIds.size()]));
		double creditAmount = 0;
		double debitAmount = 0;
		for (Map<String, Object> temp : tempList) {

			if (temp.get("type").equals("Credit")) {
				temp.put("credit", temp.get("amount"));
				temp.put("debit", "");
				creditAmount += (double) temp.get("amount");
			} else {
				temp.put("credit", "");
				temp.put("debit", temp.get("amount"));
				debitAmount += (double) temp.get("amount");
			}
			temp.remove("amount");
			temp.remove("type");
		}
		;
		Map<String, Object> totalMap = new HashMap();
		totalMap.put("title", "TOTAL");
		totalMap.put("credit", creditAmount);
		totalMap.put("debit", debitAmount);
		tempList.add(totalMap);
		return tempList;
	}
}
