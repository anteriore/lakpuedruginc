package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class ReturnSlipProduct {
	@Id
	@GeneratedValue
	private Long id;
	@OneToOne
	private Product product;
	private Double goodQuantity;
	private Double badQuantity;
	private Double unitPrice;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Double getGoodQuantity() {
		return goodQuantity;
	}
	public void setGoodQuantity(Double goodQuantity) {
		this.goodQuantity = goodQuantity;
	}
	public Double getBadQuantity() {
		return badQuantity;
	}
	public void setBadQuantity(Double badQuantity) {
		this.badQuantity = badQuantity;
	}
	public Double getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	
	
}
