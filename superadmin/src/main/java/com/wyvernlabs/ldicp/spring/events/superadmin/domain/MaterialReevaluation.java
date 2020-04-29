package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Calendar;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ApprovedReceipt.ApprovedReceipt;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class MaterialReevaluation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	@OneToOne
	private ApprovedReceipt approvedReceipt;
	@OneToOne
	private Company company;
	private Date date;
	private Date expiration;
	private Date bestBefore;
	private Date reevaluation;
	private Date retest;
	private int allowance;
	private String remarks;
	@Transient
	private Date extended;
	@OneToOne
	private User reevaluatedBy;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public ApprovedReceipt getApprovedReceipt() {
		return approvedReceipt;
	}

	public void setApprovedReceipt(ApprovedReceipt approvedReceipt) {
		this.approvedReceipt = approvedReceipt;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public Date getExpiration() {
		return expiration;
	}

	public void setExpiration(Date expiration) {
		this.expiration = expiration;
	}

	public Date getBestBefore() {
		return bestBefore;
	}

	public void setBestBefore(Date bestBefore) {
		this.bestBefore = bestBefore;
	}

	public Date getReevaluation() {
		return reevaluation;
	}

	public void setReevaluation(Date reevaluation) {
		this.reevaluation = reevaluation;
	}

	public Date getRetest() {
		return retest;
	}

	public void setRetest(Date retest) {
		this.retest = retest;
	}

	public int getAllowance() {
		return allowance;
	}

	public void setAllowance(int allowance) {
		this.allowance = allowance;
	}

	public Date getExtended() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(expiration);
		cal.add(Calendar.MONTH, allowance);
		extended = cal.getTime();
		return extended;
	}

	public void setExtended(Date extended) {
		this.extended = extended;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public User getReevaluatedBy() {
		return reevaluatedBy;
	}

	public void setReevaluatedBy(User reevaluatedBy) {
		this.reevaluatedBy = reevaluatedBy;
	}

}
