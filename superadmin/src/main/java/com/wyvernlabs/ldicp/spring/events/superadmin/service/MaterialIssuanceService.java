package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.IssuedInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.StockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MaterialIssuanceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.StockCardRepository;

@Component
public class MaterialIssuanceService {
	@Autowired
	private MaterialIssuanceRepository materialIssuanceRepository;
	@Autowired
	private InventoryRepository inventoryRepository;
	@Autowired
	private StockCardService stockCardService;

	@Transactional
	public MaterialIssuance saveMaterialIssuance(MaterialIssuance mis) {
		Long id = materialIssuanceRepository.getMaxId();
		if (id == null) {
			id = 0L;
		}

		mis.setMisNo("MIS-" + ++id);
		for (IssuedInventory ii : mis.getInventoryList()) {
			Inventory inventory = inventoryRepository.findByControlNumberAndCompany(ii.getControlNumber(),
					mis.getCompany());
			inventory.setQuantity(inventory.getQuantity() - ii.getQuantity());
			inventoryRepository.save(inventory);

			stockCardService.saveStockCard("MIS", mis.getCompany(), ii.getControlNumber(), new Date(), ii.getQuantity(),
					mis.getRemarks(), "OUT", mis.getRequestedBy());
		}
		return materialIssuanceRepository.save(mis);
	}
}
