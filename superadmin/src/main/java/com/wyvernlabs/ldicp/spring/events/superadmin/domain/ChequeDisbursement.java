package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class ChequeDisbursement {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	private Date date;
	@OneToOne
	private ChequePrinting chequePrinting;
	private String orNumber;
	@OneToOne
	private Company company;
	@OneToMany(cascade = CascadeType.ALL)
	private Set<AccountTitleEntry> accountTitles;

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

	public ChequePrinting getChequePrinting() {
		return chequePrinting;
	}

	public void setChequePrinting(ChequePrinting chequePrinting) {
		this.chequePrinting = chequePrinting;
	}

	public String getOrNumber() {
		return orNumber;
	}

	public void setOrNumber(String orNumber) {
		this.orNumber = orNumber;
	}

	public Set<AccountTitleEntry> getAccountTitles() {
		return accountTitles;
	}

	public void setAccountTitles(Set<AccountTitleEntry> accountTitles) {
		this.accountTitles = accountTitles;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

}
