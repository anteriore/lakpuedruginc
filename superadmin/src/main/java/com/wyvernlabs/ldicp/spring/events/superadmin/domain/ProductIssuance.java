package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class ProductIssuance {
	@Id
	@GeneratedValue
	private Long id;
	private String pisNo;
	private Date date;
	@OneToOne
	private User requestedBy;
	private String remarks;
	@OneToOne
	private Company company;
	@OneToOne
	private Depot fromDepot;
	@OneToOne
	private Depot toDepot;
	@OneToMany(cascade=CascadeType.ALL)
	private Set<IssuedProductInventory> inventoryList;
	private String status = "Pending";
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getPisNo() {
		return pisNo;
	}
	public void setPisNo(String pisNo) {
		this.pisNo = pisNo;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
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
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public Depot getFromDepot() {
		return fromDepot;
	}
	public void setFromDepot(Depot fromDepot) {
		this.fromDepot = fromDepot;
	}
	public Depot getToDepot() {
		return toDepot;
	}
	public void setToDepot(Depot toDepot) {
		this.toDepot = toDepot;
	}
	public Set<IssuedProductInventory> getInventoryList() {
		return inventoryList;
	}
	public void setInventoryList(Set<IssuedProductInventory> inventoryList) {
		this.inventoryList = inventoryList;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
}
