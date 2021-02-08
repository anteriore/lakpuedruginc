package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AcknowledgementPayment;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AcknowledgementReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesInvoice;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.OrderSlipType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AcknowledgementReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.OrderSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesInvoiceRepository;

@Service
public class AcknowledgementReceiptService {
	@Autowired
	private AcknowledgementReceiptRepository acknowledgementReceiptRepository;
	@Autowired
	private SalesInvoiceRepository salesInvoiceRepository;
	@Autowired
	private OrderSlipRepository orderSlipRepository;

	@Transactional
	public AcknowledgementReceipt saveAcknowledgementReceipt(AcknowledgementReceipt acknowledgementReceipt) {
		List<AcknowledgementPayment> payments = acknowledgementReceipt.getPayments();
		for (AcknowledgementPayment payment : payments) {
			updateStatusOfSalesSlip(payment.getReference(), payment.getAppliedAmount());
		}

		if(acknowledgementReceipt.getSiAmount() == 0){
			acknowledgementReceipt.setStatus("Completed");
		}

		return acknowledgementReceiptRepository.save(acknowledgementReceipt);
	}

	private void updateStatusOfSalesSlip(SalesSlip reference, Double amount) {
		OrderSlipType type = reference.getSalesOrder().getType();
		if (type.equals(OrderSlipType.DR_SI)) {
			SalesInvoice si = salesInvoiceRepository.getOne(reference.getId());
			si.deductFromRemainingBalance(amount);
			if (si.getRemainingBalance() == 0) {
				si.setStatus("Completed");
			} else {
				si.setStatus("Incomplete");
			}
			salesInvoiceRepository.save(si);
		} else if (type.equals(OrderSlipType.OS)) {
			OrderSlip os = orderSlipRepository.getOne(reference.getId());
			os.deductFromRemainingBalance(amount);
			if (os.getRemainingBalance() == 0) {
				os.setStatus("Completed");
			} else {
				os.setStatus("Incomplete");
			}
			orderSlipRepository.save(os);
		} else {
			throw new IllegalArgumentException("Invalid Sales Order Type");
		}
	}
}
