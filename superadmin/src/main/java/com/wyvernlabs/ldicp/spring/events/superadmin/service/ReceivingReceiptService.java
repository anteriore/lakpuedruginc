package com.wyvernlabs.ldicp.spring.events.superadmin.service;

import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;

@Component
public class ReceivingReceiptService {
	@Autowired
	private ReceivingReceiptRepository receivingReceiptRepository;
	@Autowired
	private PurchaseOrderRepository purchaseOrderRepository;
	@Autowired
	private ItemRepository itemRepository;
	@Autowired
	private EngineeringInventoryService engineeringInventoryService;
	@Autowired
	private StockCardService stockCardService;

	@Transactional
	public ReceivingReceipt saveReceivingReceipt(ReceivingReceipt receivingReceipt) {
		Long id = receivingReceiptRepository.getMaxId();
		if (id == null) {
			id = 0L;
		}

		receivingReceipt.setNumber("RR-" + ++id);
		if (receivingReceipt.getTolling()) {
			PurchaseOrder po = purchaseOrderRepository.getOne(receivingReceipt.getPurchaseOrder().getId());
			Set<ReceivingReceipt> receivingReceipts = po.getReceivingReceipts();

			for (ReceivedItem receivedItem : receivingReceipt.getReceivedItems()) {
				Item item = itemRepository.getOne(receivedItem.getItem().getId());
				if (!item.getType().getCode().equals("RM") && !item.getType().getCode().equals("PM")) {
					receivedItem.setStatus("Approved");
					engineeringInventoryService.addEngineeringInventory(item, receivedItem.getQuantity(),
							receivingReceipt.getCompany());
					stockCardService.saveStockCard("RR", receivingReceipt.getCompany(), item.getCode(),
							receivingReceipt.getDate(), receivedItem.getQuantity(), receivingReceipt.getRemarks(), "IN",
							receivingReceipt.getReceivedBy());
				}
			}

			if (receivingReceipt.isReceivedItemCompletelyApproved()) {
				receivingReceipt.setStatus("Completed");
			}

			receivingReceipt.setPoNumber(po.getNumber());
			receivingReceipts.add(receivingReceipt);
			po.setReceivingReceipts(receivingReceipts);
			po.updateStatusOfOrderedItems();
			purchaseOrderRepository.save(po);
		} else {
			receivingReceipt = receivingReceiptRepository.save(receivingReceipt);
		}
		return receivingReceipt;

	}
}
