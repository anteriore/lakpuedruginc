package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PostDatedChequeDisbursement;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PostDatedChequeDisbursementRepository;

@RestController
@RequestMapping("rest/pdc-disbursements")
public class PostDatedChequeDisbursementRestController {
	private static final Logger logger = LoggerFactory.getLogger(PostDatedChequeDisbursementRestController.class);

	@Autowired
	private PostDatedChequeDisbursementRepository pdcDisbursementRepository;

	@Autowired
	private CompanyRepository companyRepository;

	@GetMapping("/{id}")
	public PostDatedChequeDisbursement get(@PathVariable Long id) {
		return pdcDisbursementRepository.getOne(id);
	}

	@GetMapping()
	public List<PostDatedChequeDisbursement> list() {
		return pdcDisbursementRepository.findAll();
	}

	@Transactional
	@PostMapping()
	public PostDatedChequeDisbursement upsert(@RequestBody PostDatedChequeDisbursement pdcDisbursement) {
		PostDatedChequeDisbursement pdc = pdcDisbursementRepository.save(pdcDisbursement);
		pdc.setNumber("PDC" + pdc.getId());
		return pdcDisbursementRepository.save(pdc);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		pdcDisbursementRepository.deleteById(id);
		return true;
	}

	@GetMapping("/status/{status}")
	public List<PostDatedChequeDisbursement> list(@PathVariable String status) {
		return pdcDisbursementRepository.findByStatus(status);
	}

	@GetMapping("/company/{companyId}/start/{startDate}/end/{endDate}")
	public List<Map<String, Object>> getByCompanyAndDates(@PathVariable Long companyId, @PathVariable Date startDate,
			@PathVariable Date endDate) {
		Company company = companyRepository.getOne(companyId);
		List<PostDatedChequeDisbursement> vpList = pdcDisbursementRepository.findByCompanyAndDateBetween(company,
				startDate, endDate);
		List<Map<String, Object>> vpMapList = new ArrayList();
		vpList.forEach(elt -> {
			elt.getCheques().forEach(elt2 -> {
				Map<String, Object> map = new LinkedHashMap();
				map.put("payee", elt.getPayee().getName());
				map.put("chequeDetails", elt2.getNumber());
				map.put("chequeDate", new SimpleDateFormat("yyyy-MM-dd").format(elt2.getDate()));
				map.put("amount", elt2.getAmount());
				map.put("status", elt2.getStatus());
				vpMapList.add(map);
			});
		});

		return vpMapList;
	}
}
