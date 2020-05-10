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
		memoSlip.setNumber(memoSlip.getType().getCode() + memoSlip.getId());
		memoSlip.updateBalance();
		return memoSlipRepository.save(memoSlip);
	}
}
