package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.StockCard;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ApprovedReceipt.ApprovedReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ApprovedReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivedItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;

@Service
public class ApprovedReceiptService {
	@Autowired
	private ApprovedReceiptRepository approvedReceiptRepository;
	@Autowired
	private InventoryRepository inventoryRepository;
	@Autowired
	private ReceivingReceiptRepository receivingReceiptRepository;
	@Autowired
	private ReceivedItemRepository receivedItemRepository;
	@Autowired
	private StockCardService stockCardService;
	@Autowired
	private CompanyRepository companyRepository;
	@Transactional
	public ApprovedReceipt save(ApprovedReceipt ar) {
			Long id = approvedReceiptRepository.getMaxId();
			if(id == null) {
				id = 0L;
			}
			
			ar.setNumber("AR-" + ++id);
			ReceivingReceipt rr = receivingReceiptRepository.findOne(ar.getReceivingReceipt().getId());
			for(ReceivedItem receivedItem : rr.getReceivedItems()) {
				ReceivedItem ri = receivedItemRepository.findOne(receivedItem.getId());
				if(ri.getItem().getId() == ar.getItem().getId()) {
					ri.setStatus("Approved");
					receivedItemRepository.save(ri);
				}
			}

			if(rr.isReceivedItemCompletelyApproved()) {
				rr.setStatus("Completed");
			}else {
				rr.setStatus("Incomplete");
			}

			receivingReceiptRepository.save(rr);
			ar.setReceivingReceipt(rr);




		Inventory inventory = new Inventory();
		inventory.setCompany(ar.getCompany());
		inventory.setControlNumber(ar.getControlNumber());
		inventory.setItem(ar.getItem());
		inventory.setQuantity(ar.getApprovedQuantity());
		inventory.setBestBefore(ar.getBestBefore());
		inventory.setReevaluation(ar.getReevaluation());
		inventory.setExpiration(ar.getExpiration());
		inventory.setRetest(ar.getRetest());
		inventoryRepository.save(inventory);
		
		stockCardService.saveStockCard("AR", companyRepository.findOne(ar.getCompany().getId()), ar.getControlNumber(), new Date(), ar.getApprovedQuantity(), ar.getRemarks(), "IN", ar.getReceivedBy());
		
		return approvedReceiptRepository.save(ar);
	}
}
