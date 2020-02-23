package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class OrderedItem {
	@Id
    @GeneratedValue
    private Long id;
	@OneToOne
	private Item item;
	private int quantity;
	private Double unitPrice;
	private Double amount;
	private String poNumber;
	private String prfNumber;
	@OneToOne
	private Unit unit;
	private String status = "Pending";
	private Long requestedItemId;
	private int quantityRemaining;
	
	public String getPrfNumber() {
		return prfNumber;
	}
	public void setPrfNumber(String prfNumber) {
		this.prfNumber = prfNumber;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Item getItem() {
		return item;
	}
	public void setItem(Item item) {
		this.item = item;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Double getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public String getPoNumber() {
		return poNumber;
	}
	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}
	public Unit getUnit() {
		return unit;
	}
	public void setUnit(Unit unit) {
		this.unit = unit;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Long getRequestedItemId() {
		return requestedItemId;
	}
	public void setRequestedItemId(Long requestedItemId) {
		this.requestedItemId = requestedItemId;
	}
	public int getQuantityRemaining() {
		return quantityRemaining;
	}
	public void setQuantityRemaining(int quantityRemaining) {
		this.quantityRemaining = quantityRemaining;
	}
	
	
	

	
}
