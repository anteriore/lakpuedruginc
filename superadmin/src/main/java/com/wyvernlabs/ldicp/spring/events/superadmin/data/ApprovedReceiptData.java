package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ApprovedReceipt.ApprovedReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ApprovedReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseRequestRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.ApprovedReceiptService;

@Component
public class ApprovedReceiptData {
	private static final Logger logger = LoggerFactory.getLogger(ApprovedReceiptData.class);

	@Autowired
	private ReceivingReceiptRepository receivingReceiptRepository;
	@Autowired
	private PurchaseOrderRepository purchaseOrderRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ApprovedReceiptRepository approvedReceiptRepository;
	@Autowired
	private PurchaseRequestRepository purchaseRequestRepository;
	@Autowired
	private ApprovedReceiptService approvedReceiptService;

	@Transactional
	public void init() {
		// https://stackoverflow.com/questions/24482117/when-use-getone-and-findone-methods-spring-data-jpa
		Company c1 = companyRepository.getOne(1L);
		User u1 = userRepository.getOne(1L);
		ReceivingReceipt rr1 = receivingReceiptRepository.getOne(1L);
		ReceivingReceipt rr2 = receivingReceiptRepository.getOne(2L);
		Item i1 = itemRepository.getOne(1L);
		Item i2 = itemRepository.getOne(2L);

		logger.info("===> item to be moved to inventory: {} {}", i1.getName(), i1.getCode());
		logger.info("===> item to be moved to inventory: {} {}", i2.getName(), i2.getCode());

		ApprovedReceipt ar1 = new ApprovedReceipt();
		ar1.setDate(new Date());
		ar1.setReceivedBy(u1);
		ar1.setCompany(c1);
		ar1.setMaxContainers(1);
		ar1.setSpecifiedGravity(1.0);
		ar1.setDateCreated(new Date());
		ar1.setModified(new Date());
		ar1.setReceivingReceipt(rr1);
		ar1.setApprovedQuantity(100);
		ar1.setReceivedQuantity(100);
		// ar1.setApprovedQuantity(101);
		// ar1.setRejectedQuantity(102);
		ar1.setQcSamples(51);
		ar1.setTotalQuantity(49);
		ar1.setExpiration(new Date());
		ar1.setBestBefore(new Date());
		ar1.setReevaluation(new Date());
		ar1.setRetest(new Date());
		ar1.setItem(i1);
		ar1.setUnit("L");
		ar1.setControlNumber("ASDASD-12345-SDFDSF-345345");
		ar1.setRemarks("REmarks For AR");
		approvedReceiptService.save(ar1);

		ApprovedReceipt ar2 = new ApprovedReceipt();
		ar2.setNumber("002");
		ar2.setDate(new Date());
		ar2.setReceivedBy(u1);
		ar2.setCompany(c1);
		ar2.setMaxContainers(1);
		ar2.setSpecifiedGravity(1.0);
		ar2.setDateCreated(new Date());
		ar2.setModified(new Date());
		ar2.setReceivingReceipt(rr1);
		ar2.setApprovedQuantity(50);
		ar2.setReceivedQuantity(50);
		// ar1.setApprovedQuantity(101);
		// ar1.setRejectedQuantity(102);
		ar2.setQcSamples(1);
		ar2.setTotalQuantity(49);
		ar2.setExpiration(new Date());
		ar2.setBestBefore(new Date());
		ar2.setReevaluation(new Date());
		ar2.setRetest(new Date());
		ar2.setItem(i2);
		ar2.setUnit(i2.getUnit().getCode());
		ar2.setControlNumber("CN-2");
		ar2.setRemarks("REmarks For AR");
		approvedReceiptService.save(ar2);

		System.out.println("------------ AR CONTROL NUMBER -------------");
		ApprovedReceipt approvedReceipt = approvedReceiptRepository.findByControlNumber("ASDASD-12345-SDFDSF-345345");
		System.out.println(approvedReceipt.getControlNumber());

	}

}
