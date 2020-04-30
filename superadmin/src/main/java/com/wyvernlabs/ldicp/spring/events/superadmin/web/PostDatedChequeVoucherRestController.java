package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PostDatedChequeDisbursement;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PostDatedChequeVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PostDatedChequeDisbursementRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PostDatedChequeVoucherRepository;

@RestController
@RequestMapping("rest/pdc-vouchers")
@Transactional
public class PostDatedChequeVoucherRestController {
	private static final Logger logger = LoggerFactory.getLogger(PostDatedChequeVoucherRestController.class);

	@Autowired
	private PostDatedChequeVoucherRepository pdcVoucherRepository;
	@Autowired
	private PostDatedChequeDisbursementRepository pdcDisbursementRepository;

	@GetMapping("/{id}")
	public PostDatedChequeVoucher get(@PathVariable Long id) {
		return pdcVoucherRepository.getOne(id);
	}

	@GetMapping()
	public List<PostDatedChequeVoucher> list() {
		return pdcVoucherRepository.findAll();
	}

	@Transactional
	@PostMapping()
	public PostDatedChequeVoucher upsert(@RequestBody PostDatedChequeVoucher pdcVoucher) {
		PostDatedChequeVoucher v = pdcVoucherRepository.save(pdcVoucher);
		v.setNumber("PDCV" + pdcVoucher.getId());
		PostDatedChequeDisbursement pdc = pdcDisbursementRepository.getOne(v.getDisbursement().getId());
		pdc.setStatus("Cleared");
		pdcDisbursementRepository.save(pdc);
		return pdcVoucherRepository.save(v);

	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		pdcVoucherRepository.deleteById(id);
		return true;
	}

}
