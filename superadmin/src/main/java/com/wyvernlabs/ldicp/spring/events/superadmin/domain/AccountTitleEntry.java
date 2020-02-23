package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class AccountTitleEntry {
	@Id
	@GeneratedValue
	private Long id;
	@OneToOne
	private AccountTitle accountTitle;
	private Double amount;
	@OneToOne
	private Department department;
	@OneToOne
	private Group group;
	@OneToOne
	private Area area;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public AccountTitle getAccountTitle() {
		return accountTitle;
	}
	public void setAccountTitle(AccountTitle accountTitle) {
		this.accountTitle = accountTitle;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public Department getDepartment() {
		return department;
	}
	public void setDepartment(Department department) {
		this.department = department;
	}
	public Group getGroup() {
		return group;
	}
	public void setGroup(Group group) {
		this.group = group;
	}
	public Area getArea() {
		return area;
	}
	public void setArea(Area area) {
		this.area = area;
	}
	
}
