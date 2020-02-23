package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class DeliveryReceipt {
	@Id
    @GeneratedValue
    private Long id;
	private String number;
	private Date date;
	@OneToOne
	private SalesOrder salesOrder;
	@OneToMany(cascade=CascadeType.ALL)
	private List<DeliveredProduct> deliveredProducts;
	@OneToOne
	private Company company;
	@OneToOne
	private User preparedBy;
	@OneToOne
	private User checkedBy;
	@OneToOne
	private User approvedBy;
	@OneToOne
	private User releasedBy;
	private String remarks;
	private String status = "Pending";
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
	public SalesOrder getSalesOrder() {
		return salesOrder;
	}
	public void setSalesOrder(SalesOrder salesOrder) {
		this.salesOrder = salesOrder;
	}
	public List<DeliveredProduct> getDeliveredProducts() {
		return deliveredProducts;
	}
	public void setDeliveredProducts(List<DeliveredProduct> deliveredProducts) {
		this.deliveredProducts = deliveredProducts;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public User getPreparedBy() {
		return preparedBy;
	}
	public void setPreparedBy(User preparedBy) {
		this.preparedBy = preparedBy;
	}
	public User getCheckedBy() {
		return checkedBy;
	}
	public void setCheckedBy(User checkedBy) {
		this.checkedBy = checkedBy;
	}
	public User getApprovedBy() {
		return approvedBy;
	}
	public void setApprovedBy(User approvedBy) {
		this.approvedBy = approvedBy;
	}
	public User getReleasedBy() {
		return releasedBy;
	}
	public void setReleasedBy(User releasedBy) {
		this.releasedBy = releasedBy;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	public boolean allProductsInTransit() {
		for(DeliveredProduct deliveredProduct : deliveredProducts) {
			if(!deliveredProduct.getStatus().equals("In Transit"))
				return false;
		}	
		
		return true;
	}
}
