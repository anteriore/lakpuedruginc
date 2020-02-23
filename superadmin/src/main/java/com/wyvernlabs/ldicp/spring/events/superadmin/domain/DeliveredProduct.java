package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class DeliveredProduct {
	@Id
    @GeneratedValue
    private Long id;
	@OneToOne
	private Product product;
	private int quantity;
	private String deliveryReceiptNo;
	private Long salesOrderProductId;
	private String status = "Pending";
	
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
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getDeliveryReceiptNo() {
		return deliveryReceiptNo;
	}
	public void setDeliveryReceiptNo(String deliveryReceiptNo) {
		this.deliveryReceiptNo = deliveryReceiptNo;
	}
	public Long getSalesOrderProductId() {
		return salesOrderProductId;
	}
	public void setSalesOrderProductId(Long salesOrderProductId) {
		this.salesOrderProductId = salesOrderProductId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
