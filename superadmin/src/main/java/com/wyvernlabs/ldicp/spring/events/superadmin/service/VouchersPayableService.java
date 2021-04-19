package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JournalVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Voucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.VouchersPayable;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.JournalVoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VoucherRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.VouchersPayableRepository;

@Service
public class VouchersPayableService {
	@Autowired
	private VouchersPayableRepository vouchersPayableRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private VoucherRepository voucherRepository;
	@Autowired
	private JournalVoucherRepository journalVoucherRepository;

	@Transactional
	public VouchersPayable saveVouchersPayable(VouchersPayable vp) {
		Long id = vouchersPayableRepository.getMaxIdByStatus("Pending");
		if (id == null) {
			id = 0L;
		}

		if (!vp.hasEqualDebitAndCreditAmount())
			throw new RuntimeException("Debit and Credit not the same");

		vp.setNumber("VPFA-" + ++id);

		switch (vp.getVariation()) {
			case "1 Voucher":
				Voucher voucher = voucherRepository.getOne(vp.getVoucher().getId());
				voucher.setStatus("Completed");
				if (voucher.isHasAdjustment()) {
					List<JournalVoucher> adjustments = journalVoucherRepository.findByCompanyAndVoucher(vp.getCompany(),
							voucher);
					adjustments.forEach(jv -> {
						jv.setStatus("Completed");
					});
					journalVoucherRepository.saveAll(adjustments);
				}
				voucherRepository.save(voucher);
				break;
			case "Multiple PJV":
			case "Multiple JV":
				vp.getVouchers().forEach(v -> {
					Voucher voucher2 = voucherRepository.getOne(v.getId());
					voucher2.setStatus("Completed");
					voucherRepository.save(voucher2);
				});
				break;
		}
		return vouchersPayableRepository.save(vp);
	}

	@Transactional
	public VouchersPayable approveVouchersPayable(Long id, Long userId) {
		VouchersPayable vp = vouchersPayableRepository.getOne(id);
		User approvedBy = userRepository.getOne(userId);

		Long maxId = vouchersPayableRepository.getMaxIdInStatus(new String[] { "Approved", "Cheque Created", "Completed" });

		if (maxId == null) {
			maxId = 0L;
		}

		vp.setNumber("VP-" + ++maxId);

		vp.setStatus("Approved");
		vp.setApprovedBy(approvedBy);
		return vouchersPayableRepository.save(vp);
	}

	@Transactional
	public VouchersPayable rejectVouchersPayable(Long id, Long userId) {
		VouchersPayable vp = vouchersPayableRepository.getOne(id);
		User approvedBy = userRepository.getOne(userId);

		/*Long maxId = vouchersPayableRepository.getMaxIdInStatus(new String[] { "Approved", "Completed" });

		if (maxId == null) {
			maxId = 0L;
		}

		vp.setNumber("VP-" + ++maxId);*/

		vp.setStatus("Rejected");
		vp.setApprovedBy(approvedBy);
		return vouchersPayableRepository.save(vp);
	}

}
