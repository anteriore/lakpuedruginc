package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class Inventory {
	@Id
	@GeneratedValue
	private Long id;
	@OneToOne
	private Item item;
	private String controlNumber;
	private int quantity;
	@OneToOne
	private Company company;
	private Date dateCreated;
	private Date expiration;
    private Date bestBefore;
    private Date reevaluation;
    private Date retest;
	private int moqReserved;
    private int moQuantity;
	private int ppQuantity;
    
	@PrePersist
	protected void onCreate() {
		dateCreated = new Date();
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
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}

	public int getPpQuantity() {
		return ppQuantity;
	}

	public void setPpQuantity(int ppQuantity) {
		this.ppQuantity = ppQuantity;
	}

	public int getMoqReserved() {
		return moqReserved;
	}

	public void setMoqReserved(int moqReserved) {
		this.moqReserved = moqReserved;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public Date getExpiration() {
		return expiration;
	}

	public void setExpiration(Date expiration) {
		this.expiration = expiration;
	}

	public Date getBestBefore() {
		return bestBefore;
	}

	public void setBestBefore(Date bestBefore) {
		this.bestBefore = bestBefore;
	}

	public Date getReevaluation() {
		return reevaluation;
	}

	public void setReevaluation(Date reevaluation) {
		this.reevaluation = reevaluation;
	}

	public Date getRetest() {
		return retest;
	}

	public void setRetest(Date retest) {
		this.retest = retest;
	}

	public int getMoQuantity() {
		return moQuantity;
	}

	public void setMoQuantity(int moQuantity) {
		this.moQuantity = moQuantity;
	}
}
