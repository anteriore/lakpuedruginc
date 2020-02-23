package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class ReceivingReceipt {
	@Id
	@GeneratedValue
	private Long id;
	private String number;
	private Date date;
	private String status = "Pending";
	@OneToOne
	private User receivedBy;
	@JsonBackReference
	@ManyToOne
	private PurchaseOrder purchaseOrder;
	@OneToOne
	private Company company;
	private String drNumber;
	private String siNumber;
	private String remarks;
	private String poNumber;
	private String deliveryType;
	@OneToMany(cascade = CascadeType.ALL)
	private List<ReceivedItem> receivedItems;
	private String origin;
	private boolean tolling;
	@OneToOne(optional = true)
	private PurchaseVoucher purchaseVoucher;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public List<ReceivedItem> getReceivedItems() {
		return receivedItems;
	}
	public void setReceivedItems(List<ReceivedItem> receivedItems) {
		this.receivedItems = receivedItems;
	}
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	
	public int getQuantityOfItem(Long itemId) {
		for(ReceivedItem receivedItem : receivedItems) {
			if(receivedItem.getItem().getId() == itemId) {
				return receivedItem.getQuantity();
			}
		}
		return 0;
	}
	
	public boolean isReceivedItemCompletelyApproved() {
		for(ReceivedItem receivedItem: receivedItems) {
			if(!receivedItem.getStatus().equals("Approved"))
				return false;
		}
		
		return true;
	}
	public void setTolling(boolean tolling) {
		this.tolling = tolling;
	}

	public boolean getTolling() {
		return tolling;
	}
	
	public PurchaseVoucher getPurchaseVoucher() {
		return purchaseVoucher;
	}
	public void setPurchaseVoucher(PurchaseVoucher purchaseVoucher) {
		this.purchaseVoucher = purchaseVoucher;
	}
	public String getPoNumber() {
		return poNumber;
	}
	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}
	
}
