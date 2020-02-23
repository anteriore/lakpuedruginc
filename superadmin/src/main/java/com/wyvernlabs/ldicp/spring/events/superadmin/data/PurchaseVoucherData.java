package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AccountTitleEntry;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AccountTitleRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AreaRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepartmentRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.GroupRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VendorRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.PurchaseVoucherService;

@Component
public class PurchaseVoucherData {
	@Autowired
	private PurchaseVoucherService purchaseVoucherService;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private ReceivingReceiptRepository receivingReceiptRepository;
	@Autowired
	private VendorRepository vendorRepository;
	@Autowired
	private AccountTitleRepository accountTitleRepository;
	@Autowired
	private DepartmentRepository departmentRepository;
	@Autowired
	private AreaRepository areaRepository;
	@Autowired
	private GroupRepository groupRepository;
	public void init() {
		PurchaseVoucher pv = new PurchaseVoucher();
		ReceivingReceipt rr = receivingReceiptRepository.findOne(1L);
		Set<AccountTitleEntry> accountTitles = new HashSet<AccountTitleEntry>();
		AccountTitleEntry accountTitleEntry = new AccountTitleEntry();
		accountTitleEntry.setAccountTitle(accountTitleRepository.findByTitle("Assets"));
		accountTitleEntry.setAmount(50D);
		accountTitleEntry.setDepartment(departmentRepository.findOne(1L));
		accountTitleEntry.setArea(areaRepository.findOne(1L));
		accountTitleEntry.setGroup(groupRepository.findOne(1L));
		accountTitles.add(accountTitleEntry);
		
		accountTitleEntry = new AccountTitleEntry();
		accountTitleEntry.setAccountTitle(accountTitleRepository.findByTitle("Liabilities"));
		accountTitleEntry.setAmount(50D);
		accountTitleEntry.setDepartment(departmentRepository.findOne(2L));
		accountTitleEntry.setArea(areaRepository.findOne(2L));
		accountTitleEntry.setGroup(groupRepository.findOne(2L));
		accountTitles.add(accountTitleEntry);
		
		pv.setCompany(companyRepository.findOne(1L));
		pv.setDate(new Date());
		pv.setRrNumber(rr.getNumber());
		pv.setDrNumber(rr.getDrNumber());
		pv.setPoNumber(rr.getPurchaseOrder().getNumber());
		pv.setRemarks("remarks");
		pv.setRrDate(rr.getDate());
		pv.setSiNumber(rr.getSiNumber());
		pv.setVendor(vendorRepository.findOne(1L));
		pv.setAccountTitles(accountTitles);
		pv.setManual(false);
		
		purchaseVoucherService.savePurchaseVoucher(pv);
		purchaseVoucherService.approvePurchaseVoucher(pv.getId(), 0L);
	}
}
