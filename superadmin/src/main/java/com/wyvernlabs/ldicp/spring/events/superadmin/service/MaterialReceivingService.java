package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.IssuedInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialIssuance;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MaterialReceiving;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.StockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MaterialIssuanceRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MaterialReceivingRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.StockCardRepository;

@Component
public class MaterialReceivingService {
	@Autowired
	private MaterialReceivingRepository materialReceivingRepository;
	@Autowired
	private MaterialIssuanceRepository materialIssuanceRepository;
	@Autowired
	private InventoryRepository inventoryRepository;
	@Autowired
	private StockCardService stockCardService;
	@Autowired
	private CompanyRepository companyRepository;

	@Transactional
	public MaterialReceiving saveMaterialReceiving(MaterialReceiving materialReceiving) {
		Long id = materialReceivingRepository.getMaxId();
		if (id == null) {
			id = 0L;
		}

		materialReceiving.setMrsNo("MRS-" + ++id);
		MaterialIssuance mis = materialReceiving.getMis();
		mis = materialIssuanceRepository.getOne(mis.getId());
		mis.setStatus("Received");
		materialIssuanceRepository.save(mis);
		materialReceiving.setMis(mis);
		for (IssuedInventory mrsInventory : materialReceiving.getMis().getInventoryList()) {
			Inventory is = inventoryRepository.findByControlNumberAndCompany(mrsInventory.getControlNumber(),
					materialReceiving.getCompany());
			if (is != null) {
				is.setQuantity(is.getQuantity() + mrsInventory.getQuantity());
				inventoryRepository.save(is);
			} else {
				Inventory misInventory = inventoryRepository
						.findByControlNumberAndCompany(mrsInventory.getControlNumber(), mis.getCompany());
				Inventory inventory = new Inventory();
				inventory.setBestBefore(misInventory.getBestBefore());
				inventory.setCompany(materialReceiving.getCompany());
				inventory.setControlNumber(misInventory.getControlNumber());
				inventory.setDateCreated(new Date());
				inventory.setExpiration(misInventory.getExpiration());
				inventory.setItem(misInventory.getItem());
				inventory.setQuantity(mrsInventory.getQuantity());
				inventory.setReevaluation(misInventory.getReevaluation());
				inventory.setRetest(misInventory.getRetest());
				inventoryRepository.save(inventory);

			}

			stockCardService.saveStockCard("MRS", companyRepository.getOne(materialReceiving.getCompany().getId()),
					mrsInventory.getControlNumber(), new Date(), mrsInventory.getQuantity(),
					materialReceiving.getRemarks(), "IN", materialReceiving.getReceivedBy());
		}

		return materialReceivingRepository.save(materialReceiving);
	}
}
