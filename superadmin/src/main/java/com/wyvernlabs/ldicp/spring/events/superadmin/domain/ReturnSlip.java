package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class ReturnSlip {
	@Id
	@GeneratedValue
	private Long id;
	private String number;
	private Date date;
	private String salesNumber;
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	private List<ReturnSlipProduct> returnSlipProducts;
	@OneToOne
	private Company company;
	@OneToOne
	private Depot depot;
	@OneToOne
	private Client client;
	private String remarks;
	private Double totalAmount;
	
	@PrePersist
	public void beforeCommit() {
		totalAmount = returnSlipProducts.stream().mapToDouble(elt -> elt.getGoodQuantity() * elt.getUnitPrice()).sum();
	}
	
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
	public List<ReturnSlipProduct> getReturnSlipProducts() {
		return returnSlipProducts;
	}
	public void setReturnSlipProducts(List<ReturnSlipProduct> returnSlipProducts) {
		this.returnSlipProducts = returnSlipProducts;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public Depot getDepot() {
		return depot;
	}
	public void setDepot(Depot depot) {
		this.depot = depot;
	}
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getSalesNumber() {
		return salesNumber;
	}
	public void setSalesNumber(String salesNumber) {
		this.salesNumber = salesNumber;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	
	
}
