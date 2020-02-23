package com.wyvernlabs.ldicp.spring.events.superadmin.domain.InventoryMovement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Item;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class InventoryMovementItem {
	@Id
	@GeneratedValue
	private Long id;
	@OneToOne
	private Item item;
	private String controlNumber;
	private int quantity;
	
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
	public String getControlNumber() {
		return controlNumber;
	}
	public void setControlNumber(String controlNumber) {
		this.controlNumber = controlNumber;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
}
