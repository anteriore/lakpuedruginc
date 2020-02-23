package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JournalVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Voucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.JournalVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VoucherRepository;

@Service
public class JournalVoucherService {
	@Autowired
	private JournalVoucherRepository journalVoucherRepository;
	@Autowired
	private VoucherRepository voucherRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Transactional
	public JournalVoucher saveJournalVoucher(JournalVoucher jv) {
		Long id = journalVoucherRepository.getMaxIdByStatus("Pending");
		if(id == null) {
			id = 0L;
		}
		
		if(!jv.hasEqualDebitAndCreditAmount())
			throw new RuntimeException("Debit and Credit not the same");
		
		
		jv.setNumber("JFA-" + ++id);
		
		if(jv.getVoucher() != null) {
			Voucher voucher = voucherRepository.findOne(jv.getVoucher().getId());
			voucher.setHasAdjustment(true);
			voucherRepository.save(voucher);
		}
		return journalVoucherRepository.save(jv);
		
	}
	
	@Transactional
	public JournalVoucher approve(Long id, Long userId) {
		JournalVoucher jv = journalVoucherRepository.findOne(id);
		User approvedBy = userRepository.findOne(userId);
		
		Long maxId = journalVoucherRepository.getMaxIdInStatus(new String[] {"Approved", "Completed"});
		
		if(maxId == null) {
			maxId = 0L;
		}
		
		jv.setNumber("J-" + ++maxId);
		
		jv.setStatus("Approved");
		jv.setApprovedBy(approvedBy);
		return journalVoucherRepository.save(jv);
	}
	
}
