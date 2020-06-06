package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class PurchaseOrder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	private String number;
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<OrderedItem> orderedItems;
	@OneToOne
	private Vendor vendor;
	@OneToOne
	private Company company;
	@OneToOne
	private Department department;
	@OneToOne
	private Area area;

	private String currency;
	private String jobOrderNo;
	private String terms;
	private Date dueDate;
	private boolean vat;
	private String deliverTo;
	private String remarks;
	private Double totalAmount;
	private Date date;
	private String status = "PO Created";

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "purchaseOrder")
	@JsonManagedReference
	private Set<ReceivingReceipt> receivingReceipts;

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

	public Set<OrderedItem> getOrderedItems() {
		return orderedItems;
	}

	public void setOrderedItems(Set<OrderedItem> orderedItems) {
		this.orderedItems = orderedItems;
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}

	public Area getArea() {
		return area;
	}

	public void setArea(Area area) {
		this.area = area;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getJobOrderNo() {
		return jobOrderNo;
	}

	public void setJobOrderNo(String jobOrderNo) {
		this.jobOrderNo = jobOrderNo;
	}

	public String getTerms() {
		return terms;
	}

	public void setTerms(String terms) {
		this.terms = terms;
	}

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
	}

	public boolean isVat() {
		return vat;
	}

	public void setVat(boolean vat) {
		this.vat = vat;
	}

	public String getDeliverTo() {
		return deliverTo;
	}

	public void setDeliverTo(String deliverTo) {
		this.deliverTo = deliverTo;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Set<ReceivingReceipt> getReceivingReceipts() {
		return receivingReceipts;
	}

	public void setReceivingReceipts(Set<ReceivingReceipt> receivingReceipts) {
		this.receivingReceipts = receivingReceipts;
	}

	public void updateStatusOfOrderedItems() {

		for (OrderedItem orderedItem : orderedItems) {
			int sum = 0;
			for (ReceivingReceipt rr : receivingReceipts) {
				sum += rr.getQuantityOfItem(orderedItem.getItem().getId());
			}

			if (sum >= orderedItem.getQuantity())
				orderedItem.setStatus("Completed");
			else
				orderedItem.setStatus("Incomplete");
		}

		if (isCompleted()) {
			this.setStatus("Completed");
		}
	}

	public boolean isCompleted() {
		for (OrderedItem orderedItem : orderedItems) {
			if (orderedItem.getStatus() != "Completed")
				return false;
		}

		return true;
	}

}
