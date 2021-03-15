package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MemoSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MemoSlipRepository;

@Service
public class MemoSlipService {
	@Autowired
	private MemoSlipRepository memoSlipRepository;

	@Transactional
	public MemoSlip saveMemoSlip(MemoSlip memoSlip) {
		MemoSlip savedInstance = memoSlipRepository.save(memoSlip);
		savedInstance.setNumber(savedInstance.getType().getCode() + savedInstance.getId());
		savedInstance.updateBalance();
		return memoSlipRepository.save(savedInstance);
	}
}
