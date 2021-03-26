package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MemoSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MemoType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MemoSlipRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MemoTypeRepository;

@Service
public class MemoSlipService {
	@Autowired
	private MemoSlipRepository memoSlipRepository;
	@Autowired
	private MemoTypeRepository memoTypeRepository;

	@Transactional
	public MemoSlip saveMemoSlip(MemoSlip memoSlip) {
		MemoSlip savedInstance = memoSlipRepository.save(memoSlip);
		MemoType typeInstance = memoTypeRepository.getOne(savedInstance.getType().getId());
		savedInstance.setNumber(typeInstance.getCode() + savedInstance.getId());
		savedInstance.updateBalance();
		return memoSlipRepository.save(savedInstance);
	}
}
