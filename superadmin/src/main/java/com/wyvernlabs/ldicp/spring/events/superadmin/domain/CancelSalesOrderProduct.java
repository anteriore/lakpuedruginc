package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class CancelSalesOrderProduct {
	@Id
    @GeneratedValue
    private Long id;
	private Date date;
	private String reason;
	@OneToOne
	private SalesOrderProduct salesOrderProduct;
	@OneToOne
	private User cancelledBy;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public SalesOrderProduct getSalesOrderProduct() {
		return salesOrderProduct;
	}
	public void setSalesOrderProduct(SalesOrderProduct salesOrderProduct) {
		this.salesOrderProduct = salesOrderProduct;
	}
	public User getCancelledBy() {
		return cancelledBy;
	}
	public void setCancelledBy(User cancelledBy) {
		this.cancelledBy = cancelledBy;
	}
	
	
}
