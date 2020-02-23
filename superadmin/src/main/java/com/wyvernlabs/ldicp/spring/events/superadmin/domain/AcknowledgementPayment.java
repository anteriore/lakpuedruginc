package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class AcknowledgementPayment {
	@Id
    @GeneratedValue
    private Long id;
	@OneToOne
	private SalesSlip reference;
	private Double appliedAmount;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public SalesSlip getReference() {
		return reference;
	}
	public void setReference(SalesSlip reference) {
		this.reference = reference;
	}
	public Double getAppliedAmount() {
		return appliedAmount;
	}
	public void setAppliedAmount(Double appliedAmount) {
		this.appliedAmount = appliedAmount;
	}
	
	
}
