package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ItemType;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RequestedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Inventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ItemTypeRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PurchaseOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.PurchaseRequestService;

@RestController
@RequestMapping("rest/items")
public class ItemRestController {
    private static final Logger logger = LoggerFactory.getLogger(ItemRestController.class);
    
	@Autowired
	private CompanyRepository companyRepository;

	@Autowired
    private ItemRepository itemRepository;
	@Autowired
    private ItemTypeRepository itemTypeRepository;

	@Autowired
	private PurchaseRequestService purchaseRequestService;

    @Autowired
    private InventoryRepository inventoryRepository;

	@Autowired
	private PurchaseOrderRepository purchaseOrderRepository;
    
	@Autowired
	private ReceivingReceiptRepository receivingReceiptRepository;

    public ItemRestController(ItemRepository itemRepository, ItemTypeRepository itemTypeRepository) {
        this.itemRepository = itemRepository;
        this.itemTypeRepository = itemTypeRepository;
    }

    @GetMapping("/{id}")
    public Item get(@PathVariable Long id) {
        return itemRepository.getOne(id);
    }

    @GetMapping()
    public List<Item> list() {
        return itemRepository.findAll();
    }

    @PostMapping()
    public Item upsert(@RequestBody Item item) {
        return itemRepository.save(item);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        itemRepository.deleteById(id);
        return true;
    }

    @GetMapping("/type/{type}")
    public List<Item> listByType(@PathVariable String type) {
        List<ItemType> itemTypes = itemTypeRepository.findByCode(type);
        return itemRepository.findByType(itemTypes.get(0));
    }

    @GetMapping("/rm-pm")
    public List<Item> listRmPm() {
        List<ItemType> itemTypesRm = itemTypeRepository.findByCode("RM");
        List<ItemType> itemTypesPm = itemTypeRepository.findByCode("PM");
        List<Item> items = itemRepository.findByType(itemTypesRm.get(0));
        items.addAll(itemRepository.findByType(itemTypesPm.get(0)));
        return items;
    }

    @GetMapping("company/{companyId}/summary")
    public List listItemSummary(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
        List<Item> items = itemRepository.findAll();
        List itemSummaryList = new ArrayList();

        HashMap itemSummary;
		int prfQuantity, poQuantity,stockQuantity, quarantineQuantity;
        List<RequestedItem> requestedItems;
        List<Inventory> inventoryList;
        List<PurchaseOrder> purchaseOrders = purchaseOrderRepository.findByCompanyAndStatus(company, "PO Created");
        List<ReceivingReceipt> receivingReceipts = receivingReceiptRepository.findByCompanyAndStatus(company, "Pending");

        for (Item item : items) {
            itemSummary = new HashMap();
            itemSummary.put("item", item);

            prfQuantity = poQuantity = stockQuantity = quarantineQuantity = 0;

            requestedItems = purchaseRequestService.getNotCompletedRequestedItemsByCompanyAndItem(company, item);
            for (RequestedItem requestedItem : requestedItems) {
                if (requestedItem.getStatus().equals("Pending")) {
                    prfQuantity += requestedItem.getQuantityRequested();
                } else if (requestedItem.getStatus().equals("Incomplete")) {
                    prfQuantity += requestedItem.getQuantityRemaining();
                }
            }
            
            for (PurchaseOrder purchaseOrder : purchaseOrders) {
                for (OrderedItem orderedItem : purchaseOrder.getOrderedItems()) {
                    poQuantity += orderedItem.getQuantity();
                }
            }

            inventoryList = inventoryRepository.findByItemAndCompany(item, company);
            for (Inventory inventory : inventoryList) {
                stockQuantity += inventory.getQuantity();
            }

            for (ReceivingReceipt rr : receivingReceipts) {
                quarantineQuantity += rr.getQuantityOfItem(item.getId());
            }

            itemSummary.put("prfQuantity", prfQuantity);
            itemSummary.put("poQuantity", poQuantity);
            itemSummary.put("stockQuantity", stockQuantity);
            itemSummary.put("quarantineQuantity", quarantineQuantity);
            itemSummaryList.add(itemSummary);
		}
        return itemSummaryList;
    }

}
