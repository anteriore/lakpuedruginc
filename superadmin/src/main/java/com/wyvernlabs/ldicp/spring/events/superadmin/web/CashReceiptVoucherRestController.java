package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CashReceiptVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.helper.OffsetBasedPageRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CashReceiptVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;

@RestController
@RequestMapping("rest/cash-receipt-vouchers")
public class CashReceiptVoucherRestController {
	@Autowired
	private CashReceiptVoucherRepository cashReceiptVoucherRepository;
	@Autowired
	private CompanyRepository companyRepository;

	@GetMapping("/{id}")
	public CashReceiptVoucher get(@PathVariable Long id) {
		return cashReceiptVoucherRepository.getOne(id);
	}

	@GetMapping("/paginate/{itemsPerPage}/{offset}")
	public Page<CashReceiptVoucher> paginate(@PathVariable("itemsPerPage") Integer itemsPerPage,
			@PathVariable("offset") Integer offset) {
		Pageable pageable = new OffsetBasedPageRequest(offset, itemsPerPage);
		return cashReceiptVoucherRepository.findAll(pageable);
	}

	@GetMapping()
	public List<CashReceiptVoucher> list() {
		return cashReceiptVoucherRepository.findAll();
	}

	@GetMapping("/company/{companyId}")
	public List<CashReceiptVoucher> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return cashReceiptVoucherRepository.findByCompany(company);
	}

	@PostMapping()
	public CashReceiptVoucher upsert(@RequestBody CashReceiptVoucher cashReceiptVoucher) {
		return cashReceiptVoucherRepository.save(cashReceiptVoucher);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		cashReceiptVoucherRepository.deleteById(id);
		return true;
	}

	@GetMapping("/company/{companyId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getByCompanyAndDates(@PathVariable Long companyId, @PathVariable Date startDate,
			@PathVariable Date endDate) {
		Company company = companyRepository.getOne(companyId);
		List<CashReceiptVoucher> vpList = cashReceiptVoucherRepository.findByCompanyAndDateBetween(company, startDate,
				endDate);
		List<Map<String, Object>> vpMapList = new ArrayList();
		vpList.forEach(elt -> {
			Map<String, Object> map = new LinkedHashMap();
			map.put("number", elt.getNumber());
			map.put("date", new SimpleDateFormat("yyyy-MM-dd").format(elt.getDate()));
			map.put("bank", elt.getBankAccount().getName());
			map.put("voucher", elt.getVoucher() == null ? "" : elt.getVoucher().getNumber());
			map.put("amount", elt.getAmount());
			vpMapList.add(map);
		});

		return vpMapList;
	}
}
