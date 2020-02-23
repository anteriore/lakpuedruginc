package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;

@Component
public class PurchaseVoucherService {
	@Autowired
	private PurchaseVoucherRepository purchaseVoucherRepository;
	@Autowired
	private ReceivingReceiptRepository receivingReceiptRepository;
	@Autowired
	private UserRepository userRepository;
	@Transactional
	public PurchaseVoucher savePurchaseVoucher(PurchaseVoucher pv) {
		Long id = purchaseVoucherRepository.getMaxIdByStatus("Pending");
		if(id == null) {
			id = 0L;
		}
		
		
		pv.setNumber("PJFA-" + ++id);
		
		
		if(!pv.hasEqualDebitAndCreditAmount())
			throw new RuntimeException("Debit and Credit not the same");
		
		if(!isRrNumberValid(pv.getRrNumber(), pv.getCompany())) {
			throw new RuntimeException("RR Number already exists");
		}
		
		if(!pv.isManual()) {
			ReceivingReceipt rr = receivingReceiptRepository.findByCompanyAndNumber(pv.getCompany(), pv.getRrNumber());
			rr.setPurchaseVoucher(pv);
			receivingReceiptRepository.save(rr);
		}
		
		return purchaseVoucherRepository.save(pv);
	}
	
	
	@Transactional
	public PurchaseVoucher approvePurchaseVoucher(Long id, Long userId) {
		PurchaseVoucher pv = purchaseVoucherRepository.findOne(id);
		User approvedBy = userRepository.findOne(userId);
		
		Long maxId = purchaseVoucherRepository.getMaxIdInStatus(new String[] {"Approved", "Completed"});
		
		if(maxId == null) {
			maxId = 0L;
		}
		
		pv.setNumber("PJV-" + ++maxId);
		
		pv.setStatus("Approved");
		pv.setApprovedBy(approvedBy);
		return purchaseVoucherRepository.save(pv);
	}

	public boolean isRrNumberValid(String rrNumber, Company company) {
		// TODO Auto-generated method stub
		return purchaseVoucherRepository
				.findByCompany(company)
				.stream()
				.noneMatch(purchaseVoucher -> purchaseVoucher.getRrNumber().equals(rrNumber));
	}
}
