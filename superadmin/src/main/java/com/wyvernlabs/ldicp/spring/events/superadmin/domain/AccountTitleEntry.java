package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class AccountTitleEntry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
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

	public void setId(final Long id) {
		this.id = id;
	}

	public AccountTitle getAccountTitle() {
		return accountTitle;
	}

	public void setAccountTitle(final AccountTitle accountTitle) {
		this.accountTitle = accountTitle;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(final Double amount) {
		this.amount = amount;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(final Department department) {
		this.department = department;
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(final Group group) {
		this.group = group;
	}

	public Area getArea() {
		return area;
	}

	public void setArea(final Area area) {
		this.area = area;
	}

}
