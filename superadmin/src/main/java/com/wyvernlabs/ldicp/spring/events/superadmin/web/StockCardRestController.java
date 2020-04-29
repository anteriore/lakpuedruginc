package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.StockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.StockCardRepository;

@RestController
@RequestMapping("rest/stock-cards")
public class StockCardRestController {
	private static final Logger logger = LoggerFactory.getLogger(StockCardRestController.class);
	@Autowired
	private StockCardRepository stockCardRepository;
	@Autowired
	private CompanyRepository companyRepository;

	@GetMapping("/{id}")
	public StockCard get(@PathVariable Long id) {
		return stockCardRepository.getOne(id);
	}

	@GetMapping()
	public List<StockCard> list() {
		return stockCardRepository.findAll();
	}

	@PostMapping()
	public StockCard upsert(@RequestBody StockCard client) {
		return stockCardRepository.save(client);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		stockCardRepository.deleteById(id);
		return true;
	}

	@GetMapping("/company/{companyId}/control-number/{controlNumber}")
	public List<StockCard> listByControlNumberAndCompany(@PathVariable Long companyId,
			@PathVariable String controlNumber) {
		Company company = companyRepository.getOne(companyId);
		return stockCardRepository.findByControlNumberAndCompany(controlNumber, company);
	}

}
