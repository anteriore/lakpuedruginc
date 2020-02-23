package com.wyvernlabs.ldicp.spring.events.superadmin.api;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivedItem;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ReceivingReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ReceivingReceiptRepository;

@RestController
@RequestMapping("api/receivedItems")
public class ReceivedItemsApi {
    private static final Logger logger = LoggerFactory.getLogger(ReceivedItemsApi.class);
    @Autowired
    private ReceivingReceiptRepository receivingReceiptRepository;
/*
    @GetMapping()
    public List<ReceivedItemViewModel> list() {
        return receivingReceiptRepository.findAll().stream().flatMap(rr -> {
            List<ReceivedItem> receivedItems = rr.getReceivedItems();
            List<ReceivedItemViewModel> viewModels = new ArrayList<>();
            for (ReceivedItem receivedItem : receivedItems) {
                logger.info("list item: {} id: {}", receivedItem.getItem().getName(), receivedItem.getItem().getId());
                viewModels.add(new ReceivedItemViewModel(receivedItem, rr));
            }
            return viewModels.stream();
        }).collect(Collectors.toList());
    }*/
    
    @GetMapping("/status/{status}")
    public List<ReceivedItemViewModel> listByStatus(@PathVariable String status){
    	return receivingReceiptRepository.findAll().stream().flatMap(rr -> {
            List<ReceivedItem> receivedItems = rr.getReceivedItems();
            List<ReceivedItemViewModel> viewModels = new ArrayList<>();
            for (ReceivedItem receivedItem : receivedItems) {
                logger.info("list item: {} id: {}", receivedItem.getItem().getName(), receivedItem.getItem().getId());
                if(receivedItem.getStatus().equals(status))
                	viewModels.add(new ReceivedItemViewModel(receivedItem, rr));
            }
            return viewModels.stream();
        }).collect(Collectors.toList());
    }


    public static class ReceivedItemViewModel {
        private Long rrId;
        private String number;
        private Date date;
        private String status = "Quarantined";
        private User receivedBy;
        private PurchaseOrder purchaseOrder;
        private Company company;
        private String drNumber;
        private String siNumber;
        private String remarks;
        private String deliveryType;
        private ReceivedItem receivedItem;
        private String origin;

        public ReceivedItemViewModel() {
        }

        public ReceivedItemViewModel(ReceivedItem receivedItem, ReceivingReceipt rr) {
            this.receivedItem = receivedItem;
            this.rrId = rr.getId();
            this.number = rr.getNumber();
            this.date = rr.getDate();
            this.status = rr.getStatus();
            this.receivedBy = rr.getReceivedBy();
            this.purchaseOrder = rr.getPurchaseOrder();
            this.company = rr.getCompany();
            this.drNumber = rr.getDrNumber();
            this.siNumber = rr.getSiNumber();
            this.remarks = rr.getRemarks();
            this.deliveryType = rr.getDeliveryType();
            this.origin = rr.getOrigin();
        }


        public String getNumber() {
            return number;
        }
        public void setNumber(String number) {
            this.number = number;
        }
        public Date getDate() {
            return date;
        }
        public void setDate(Date date) {
            this.date = date;
        }
        public String getStatus() {
            return status;
        }
        public void setStatus(String status) {
            this.status = status;
        }
        public User getReceivedBy() {
            return receivedBy;
        }
        public void setReceivedBy(User receivedBy) {
            this.receivedBy = receivedBy;
        }
        public PurchaseOrder getPurchaseOrder() {
            return purchaseOrder;
        }
        public void setPurchaseOrder(PurchaseOrder purchaseOrder) {
            this.purchaseOrder = purchaseOrder;
        }
        public String getRemarks() {
            return remarks;
        }
        public void setRemarks(String remarks) {
            this.remarks = remarks;
        }
        public String getDrNumber() {
            return drNumber;
        }
        public void setDrNumber(String drNumber) {
            this.drNumber = drNumber;
        }
        public String getSiNumber() {
            return siNumber;
        }
        public void setSiNumber(String siNumber) {
            this.siNumber = siNumber;
        }
        public Company getCompany() {
            return company;
        }
        public void setCompany(Company company) {
            this.company = company;
        }
        public String getDeliveryType() {
            return deliveryType;
        }
        public void setDeliveryType(String deliveryType) {
            this.deliveryType = deliveryType;
        }


        public Long getRrId() {
            return rrId;
        }

        public void setRrId(Long rrId) {
            this.rrId = rrId;
        }

        public ReceivedItem getReceivedItem() {
            return receivedItem;
        }

        public void setReceivedItem(ReceivedItem receivedItem) {
            this.receivedItem = receivedItem;
        }

        public String getOrigin() {
            return origin;
        }
        public void setOrigin(String origin) {
            this.origin = origin;
        }


    }
}
