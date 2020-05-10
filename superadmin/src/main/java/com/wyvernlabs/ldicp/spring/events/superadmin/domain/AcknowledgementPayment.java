package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class AcknowledgementPayment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	@OneToOne
	private SalesSlip reference;
	private Double appliedAmount;

	public Long getId() {
		return id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public SalesSlip getReference() {
		return reference;
	}

	public void setReference(final SalesSlip reference) {
		this.reference = reference;
	}

	public Double getAppliedAmount() {
		return appliedAmount;
	}

	public void setAppliedAmount(final Double appliedAmount) {
		this.appliedAmount = appliedAmount;
	}

}
