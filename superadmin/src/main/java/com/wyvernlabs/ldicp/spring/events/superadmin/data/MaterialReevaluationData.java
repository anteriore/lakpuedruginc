package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialReevaluation;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ApprovedReceipt.ApprovedReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ApprovedReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.MaterialReevaluationService;

@Component
public class MaterialReevaluationData {
	@Autowired
	private MaterialReevaluationService materialReevaluationService;
	@Autowired
	private ApprovedReceiptRepository approvedItemRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private UserRepository userRepository;
	public void init() {
		Company c1 = companyRepository.findOne(1L);
		MaterialReevaluation mr = new MaterialReevaluation();
		List<ApprovedReceipt> approvedItems = approvedItemRepository.findAll();
		mr.setApprovedReceipt(approvedItems.get(0));
		mr.setCompany(c1);
		Date date = new Date();
		mr.setBestBefore(date);
		mr.setDate(date);
		mr.setExpiration(date);
		mr.setReevaluation(date);
		mr.setRetest(date);
		mr.setAllowance(1);
		mr.setReevaluatedBy(userRepository.getOne(1L));
		materialReevaluationService.save(mr);
	}
}
