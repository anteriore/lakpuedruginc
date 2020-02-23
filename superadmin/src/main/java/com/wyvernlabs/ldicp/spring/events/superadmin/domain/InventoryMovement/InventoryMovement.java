package com.wyvernlabs.ldicp.spring.events.superadmin.domain.InventoryMovement;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.InventoryMovementClassification;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.InventoryMovementType;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class InventoryMovement {
	@Id
	@GeneratedValue
	private Long id;
	private String number;
	@OneToOne
	private User requestedBy;
	@Enumerated(EnumType.STRING)
	private InventoryMovementType type;
	private String remarks;
	private Date date;
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	private List<InventoryMovementItem> inventory;
	@OneToOne
	private Company company;
	private String moNumber;
	@Enumerated(EnumType.STRING)
	private InventoryMovementClassification classification;
	
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
	public User getRequestedBy() {
		return requestedBy;
	}
	public void setRequestedBy(User requestedBy) {
		this.requestedBy = requestedBy;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public List<InventoryMovementItem> getInventory() {
		return inventory;
	}
	public void setInventory(List<InventoryMovementItem> inventory) {
		this.inventory = inventory;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public String getMoNumber() {
		return moNumber;
	}
	public void setMoNumber(String moNumber) {
		this.moNumber = moNumber;
	}
	public InventoryMovementType getType() {
		return type;
	}
	public void setType(InventoryMovementType type) {
		this.type = type;
	}
	public InventoryMovementClassification getClassification() {
		return classification;
	}
	public void setClassification(InventoryMovementClassification classification) {
		this.classification = classification;
	}
	
	
}
