package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.OrderSlipType;

@Entity
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
@TableGenerator(table = "SALES_SLIP_SEQUENCE", name = "SalesSlipSequenceGenerator")
@JsonTypeInfo(use = com.fasterxml.jackson.annotation.JsonTypeInfo.Id.NAME, include = As.PROPERTY, property = "type")
@JsonSubTypes({
	@JsonSubTypes.Type(value = OrderSlip.class, name="OS"),
	@JsonSubTypes.Type(value = SalesInvoice.class, name="DR_SI")
})
public abstract class SalesSlip {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "SalesSlipSequenceGenerator")
    private Long id;
	private String number;
	private Date date;
	@OneToOne
	private SalesOrder salesOrder;
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
	private Double totalAmount;
	@OneToOne
	private Depot depot;
	@OneToMany(cascade=CascadeType.ALL)
	private List<OrderedProduct> orderedProducts;
	private Double remainingBalance;
	
	@PrePersist
	public void init() {
		this.remainingBalance = totalAmount;
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
	public SalesOrder getSalesOrder() {
		return salesOrder;
	}
	public void setSalesOrder(SalesOrder salesOrder) {
		this.salesOrder = salesOrder;
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
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Depot getDepot() {
		return depot;
	}
	public void setDepot(Depot depot) {
		this.depot = depot;
	}
	public List<OrderedProduct> getOrderedProducts() {
		return orderedProducts;
	}
	public void setOrderedProducts(List<OrderedProduct> orderedProducts) {
		this.orderedProducts = orderedProducts;
	}
	public boolean allProductsInTransit() {
		for(OrderedProduct orderedProduct : orderedProducts) {
			if(!orderedProduct.getStatus().equals("In Transit"))
				return false;
		}	
		
		return true;
	}
	public Double getRemainingBalance() {
		return remainingBalance;
	}
	public void setRemainingBalance(Double remainingBalance) {
		this.remainingBalance = remainingBalance;
	}
	
	public void deductFromRemainingBalance(Double amount) {
		this.remainingBalance -= amount;
	}
	
	public void addToRemainingBalance(Double amount) {
		this.remainingBalance += amount;
	}
	
	
	public OrderSlipType getType() {
		return this.salesOrder.getType();
	}
	
}
