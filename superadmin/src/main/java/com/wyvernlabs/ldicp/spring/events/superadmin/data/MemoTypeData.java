package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MemoType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MemoTypeRepository;

@Component
public class MemoTypeData {
	@Autowired
	private MemoTypeRepository memoTypeRepository;
	
	public void init() {
		MemoType memoType = new MemoType();
		memoType.setCode("BM");
		memoType.setName("BOUNCED CHECKS");
		memoType.setType("DM");
		memoTypeRepository.save(memoType);
		
		memoType = new MemoType();
		memoType.setCode("SD");
		memoType.setName("SALES DISCOUNT");
		memoType.setType("CM");
		memoTypeRepository.save(memoType);
	
		memoType = new MemoType();
		memoType.setCode("AR");
		memoType.setName("AUTOMATIC REBATES");
		memoType.setType("CM");
		memoTypeRepository.save(memoType);
		
		memoType = new MemoType();
		memoType.setCode("SR");
		memoType.setName("SALES RETURNS");
		memoType.setType("CM");
		memoTypeRepository.save(memoType);
	}
}
