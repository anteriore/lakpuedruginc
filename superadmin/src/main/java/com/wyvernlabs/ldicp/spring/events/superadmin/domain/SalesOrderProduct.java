package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class SalesOrderProduct {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	@OneToOne
	private FinishedGood finishedGood;
	private int quantity;
	private String status = "Pending";
	private String soNumber;
	private Double unitPrice;
	@OneToOne
	private Company company;
	@OneToOne
	private Depot depot;
	private int quantityRequested;
	private int quantityRemaining;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public FinishedGood getFinishedGood() {
		return finishedGood;
	}

	public void setFinishedGood(FinishedGood finishedGood) {
		this.finishedGood = finishedGood;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSoNumber() {
		return soNumber;
	}

	public void setSoNumber(String soNumber) {
		this.soNumber = soNumber;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public int getQuantityRequested() {
		return quantityRequested;
	}

	public void setQuantityRequested(int quantityRequested) {
		this.quantityRequested = quantityRequested;
	}

	public int getQuantityRemaining() {
		return quantityRemaining;
	}

	public void setQuantityRemaining(int quantityRemaining) {
		this.quantityRemaining = quantityRemaining;
	}

	public Depot getDepot() {
		return depot;
	}

	public void setDepot(Depot depot) {
		this.depot = depot;
	}

	public Double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public void deductOrderedQuantity(int orderedQuantity) {
		if (status.equals("Pending")) {
			if (orderedQuantity >= quantity) {
				status = "In Transit";
			} else {
				status = "Incomplete";
				quantityRemaining = quantity - orderedQuantity;
			}
		} else if (status.equals("Incomplete")) {
			if (orderedQuantity >= quantityRemaining) {
				status = "In Transit";
			} else {
				quantityRemaining = quantity - orderedQuantity;
			}
		}
	}

}
