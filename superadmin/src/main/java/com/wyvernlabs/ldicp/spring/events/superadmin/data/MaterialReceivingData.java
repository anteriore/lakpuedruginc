package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialReceiving;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MaterialIssuanceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.MaterialReceivingService;

@Component
public class MaterialReceivingData {
	@Autowired
	private MaterialReceivingService materialReceivingService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private MaterialIssuanceRepository materialIssuanceRepository;
	@Autowired
	private CompanyRepository companyRepository;

	public void init() {
		/*
		MaterialReceiving mr = new MaterialReceiving();
		User receivedBy = userRepository.getOne(1L);
		MaterialIssuance mis = materialIssuanceRepository.getOne(1L);

		mr.setDate(new Date());
		mr.setMis(mis);
		mr.setReceivedBy(receivedBy);
		mr.setRemarks("Remarks");
		mr.setCompany(companyRepository.getOne(1L));
		materialReceivingService.saveMaterialReceiving(mr);
		*/
	}
}
