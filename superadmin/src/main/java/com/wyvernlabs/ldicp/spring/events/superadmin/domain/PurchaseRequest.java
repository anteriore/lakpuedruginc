package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class PurchaseRequest {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	private String number;
	private Date date;
	private Date dateNeeded;
	@OneToOne
	private User requestedBy;
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private Set<RequestedItem> requestedItems;
	private String remarks;
	@OneToOne
	private Company company;
	@OneToOne
	private Department department;

	private String status = "Pending";

	public PurchaseRequest() {
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

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

	public Date getDateNeeded() {
		return dateNeeded;
	}

	public void setDateNeeded(Date dateNeeded) {
		this.dateNeeded = dateNeeded;
	}

	public User getRequestedBy() {
		return requestedBy;
	}

	public void setRequestedBy(User requestedBy) {
		this.requestedBy = requestedBy;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
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

	public Set<RequestedItem> getRequestedItems() {
		return requestedItems;
	}

	public void setRequestedItems(Set<RequestedItem> requestedItems) {
		this.requestedItems = requestedItems;
	}

	public int getQuantityOfRequestedItem(Long itemId) {
		for (RequestedItem requestedItem : requestedItems) {
			if (requestedItem.getItem().getId() == itemId) {
				return requestedItem.getQuantityRequested();
			}
		}

		return 0;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "PurchaseRequest{" + "id=" + id + ", number='" + number + '\'' + ", date=" + date + ", dateNeeded="
				+ dateNeeded + ", requestedBy=" + requestedBy + ", requestedItems=" + requestedItems + ", remarks='"
				+ remarks + '\'' + ", company=" + company + '}';
	}
}
