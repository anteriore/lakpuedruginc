package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialReevaluation;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.StockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MaterialReevaluationRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.StockCardRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.web.dashboard.MaterialReevaluationRestController;

@Component
public class MaterialReevaluationService {
	private static final Logger logger = LoggerFactory.getLogger(MaterialReevaluationService.class);

	@Autowired
	private MaterialReevaluationRepository materialReevaluationRepository;
	@Autowired
	private StockCardService stockCardService;
	@Autowired
	private InventoryRepository inventoryRepository;
	@Autowired
	private CompanyRepository companyRepository;

	@Transactional
	public MaterialReevaluation save(MaterialReevaluation materialEvaluation) {
		String controlNumber = materialEvaluation.getApprovedReceipt().getControlNumber();

		// Company company =
		// companyRepository.getOne(materialEvaluation.getCompany().getId());
		Inventory inventory = inventoryRepository.findByControlNumberAndCompany(controlNumber,
				materialEvaluation.getCompany());
		inventory.setBestBefore(materialEvaluation.getBestBefore());
		inventory.setExpiration(materialEvaluation.getExpiration());
		inventory.setReevaluation(materialEvaluation.getReevaluation());
		inventory.setRetest(materialEvaluation.getRetest());
		inventoryRepository.save(inventory);

		stockCardService.saveStockCard("MR(EVAL)", companyRepository.getOne(materialEvaluation.getCompany().getId()),
				materialEvaluation.getApprovedReceipt().getControlNumber(), new Date(),
				materialEvaluation.getApprovedReceipt().getApprovedQuantity(), materialEvaluation.getRemarks(), "NONE",
				materialEvaluation.getReevaluatedBy());
		return materialReevaluationRepository.save(materialEvaluation);
	}

}
