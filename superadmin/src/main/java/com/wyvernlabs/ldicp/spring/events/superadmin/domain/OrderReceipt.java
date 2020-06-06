package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class OrderReceipt {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	private String number;
	private Date date;
	private String businessStyle;
	@OneToOne
	private AcknowledgementReceipt acknowledgementReceipt;
	@OneToOne
	private Depot depot;
	@OneToOne
	private User preparedBy;

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

	public AcknowledgementReceipt getAcknowledgementReceipt() {
		return acknowledgementReceipt;
	}

	public void setAcknowledgementReceipt(AcknowledgementReceipt acknowledgementReceipt) {
		this.acknowledgementReceipt = acknowledgementReceipt;
	}

	public Depot getDepot() {
		return depot;
	}

	public void setDepot(Depot depot) {
		this.depot = depot;
	}

	public String getBusinessStyle() {
		return businessStyle;
	}

	public void setBusinessStyle(String businessStyle) {
		this.businessStyle = businessStyle;
	}

	public User getPreparedBy() {
		return preparedBy;
	}

	public void setPreparedBy(User preparedBy) {
		this.preparedBy = preparedBy;
	}

}
