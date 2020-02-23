package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

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
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.ProductMovementType;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class ProductMovement {
	@Id
	@GeneratedValue
	private Long id;
	private String number;
	private Date date;
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	private List<ProductMovementItem> products;
	private String remarks;
	private Date dateCreated;
	@Enumerated(EnumType.STRING)
	private ProductMovementType type;
	@OneToOne
	private Depot depot;
	@OneToOne
	private User requestedBy;
	@OneToOne
	private Company company;
	
	@PrePersist
	public void onCreate() {
		dateCreated = new Date();
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
	
	public List<ProductMovementItem> getProducts() {
		return products;
	}

	public void setProducts(List<ProductMovementItem> products) {
		this.products = products;
	}

	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public ProductMovementType getType() {
		return type;
	}

	public void setType(ProductMovementType type) {
		this.type = type;
	}

	public Depot getDepot() {
		return depot;
	}

	public void setDepot(Depot depot) {
		this.depot = depot;
	}

	public User getRequestedBy() {
		return requestedBy;
	}

	public void setRequestedBy(User requestedBy) {
		this.requestedBy = requestedBy;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	
	
}
