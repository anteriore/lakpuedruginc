package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class RequestedItem {
	@Id
    @GeneratedValue
    private Long id;
	private int quantityRequired;
	private int quantityRequested;
	private int quantityLacking;
	private int quantityRemaining;
	@OneToOne
	private Item item;
	private int moqQuantity;
	@OneToOne
	private Unit unit;
	private String prfNumber;
	private String status = "Pending";
	@OneToOne
	private Company company;
	
	private Double unitPrice;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getQuantityRequired() {
		return quantityRequired;
	}

	public void setQuantityRequired(int quantityRequired) {
		this.quantityRequired = quantityRequired;
	}

	public int getQuantityRequested() {
		return quantityRequested;
	}

	public void setQuantityRequested(int quantityRequested) {
		this.quantityRequested = quantityRequested;
	}

	public int getQuantityLacking() {
		return quantityLacking;
	}

	public void setQuantityLacking(int quantityLacking) {
		this.quantityLacking = quantityLacking;
	}

	public Item getItem() {
		return item;
	}

	public void setItem(Item item) {
		this.item = item;
	}

	public int getMoqQuantity() {
		return moqQuantity;
	}

	public void setMoqQuantity(int moqQuantity) {
		this.moqQuantity = moqQuantity;
	}

	public Unit getUnit() {
		return unit;
	}


	public void setUnit(Unit unit) {
		this.unit = unit;
	}

	
	public String getPrfNumber() {
		return prfNumber;
	}

	public void setPrfNumber(String prfNumber) {
		this.prfNumber = prfNumber;
	}
	
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public int getQuantityRemaining() {
		return quantityRemaining;
	}

	public void setQuantityRemaining(int quantityRemaining) {
		this.quantityRemaining = quantityRemaining;
	}
	
	public void deductQuantityRequestedFromQuantity(OrderedItem orderedItem) {
		if(status.equals("Pending")) {
			if(orderedItem.getQuantity() >= quantityRequested) {
				status = "PO Created";
			}else {
				status = "Incomplete";
				quantityRemaining = orderedItem.getQuantity() - quantityRequested;
			}
		}else if(status.equals("Incomplete")) {
			if(orderedItem.getQuantity() >= quantityRemaining) {
				status = "PO Created";
			}else {
				quantityRemaining = orderedItem.getQuantity() - quantityRequested;
			}
		}
	}

	@Override
	public String toString() {
		return "RequestedItem{" +
				"id=" + id +
				", quantityRequired=" + quantityRequired +
				", quantityRequested=" + quantityRequested +
				", quantityLacking=" + quantityLacking +
				", item=" + item +
				", moqQuantity=" + moqQuantity +
				", unit=" + unit +
				'}';
	}
}