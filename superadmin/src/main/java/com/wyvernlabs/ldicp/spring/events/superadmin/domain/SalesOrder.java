package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.OrderSlipType;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class SalesOrder {
	@Id
    @GeneratedValue
    private Long id;
	@Column(nullable = false, unique = true)
	private String number;
	private Date date;
	@OneToOne
	private User preparedBy;
	@OneToOne
	private User checkedBy;
	@OneToOne
	private User approvedBy;
	@OneToOne
	private Client client;
	private String remarks;
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	private List<SalesOrderProduct> products;
	@OneToOne
	private Company company;
	@Enumerated(EnumType.STRING)
	private OrderSlipType type;
	private String status = "Pending";
	@OneToOne
	private Depot depot;
	private Double totalAmount;
	private int totalQuantity;
	
	@PrePersist
	public void init() {
		totalQuantity = products.stream().mapToInt(product -> product.getQuantityRequested()).sum();
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
	public List<SalesOrderProduct> getProducts() {
		return products;
	}
	public void setProducts(List<SalesOrderProduct> products) {
		this.products = products;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public OrderSlipType getType() {
		return type;
	}
	public void setType(OrderSlipType type) {
		this.type = type;
	}
	public boolean allProductsInTransit() {
		for(SalesOrderProduct soProduct : products) {
			if(!soProduct.getStatus().equals("In Transit"))
				return false;
		}	
		
		return true;
	}
	
	public boolean allProductsCancelled() {
		for(SalesOrderProduct soProduct : products) {
			if(!soProduct.getStatus().equals("Cancelled"))
				return false;
		}	
		return true;
	}
	public Depot getDepot() {
		return depot;
	}
	public void setDepot(Depot depot) {
		this.depot = depot;
	}
	@Override
	public String toString() {
		return "SalesOrder [id=" + id + ", number=" + number + ", date=" + date + ", preparedBy=" + preparedBy
				+ ", checkedBy=" + checkedBy + ", approvedBy=" + approvedBy + ", client=" + client + ", remarks="
				+ remarks + ", products=" + products + ", company=" + company + ", type=" + type + ", status=" + status
				+ ", depot=" + depot + "]";
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public int getTotalQuantity() {
		return totalQuantity;
	}
	public void setTotalQuantity(int totalQuantity) {
		this.totalQuantity = totalQuantity;
	}
	
}
