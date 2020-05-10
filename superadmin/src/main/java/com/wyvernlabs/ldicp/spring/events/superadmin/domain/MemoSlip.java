package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.TableGenerator;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@TableGenerator(table = "MEMO_SLIP_SEQUENCE", name = "MemoSlipSequenceGenerator")
@JsonTypeInfo(use = com.fasterxml.jackson.annotation.JsonTypeInfo.Id.NAME, include = As.PROPERTY, property = "memoSlipType")
@JsonSubTypes({ @JsonSubTypes.Type(value = CreditMemo.class, name = "CM"),
		@JsonSubTypes.Type(value = DebitMemo.class, name = "DM") })
public abstract class MemoSlip {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "MemoSlipSequenceGenerator")
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	private String number;
	private Date date;
	@OneToOne
	private SalesSlip reference;
	private String remarks;
	@OneToOne
	private MemoType type;
	private Double amount;
	@OneToOne
	private Depot depot;

	public abstract void updateBalance();

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

	public SalesSlip getReference() {
		return reference;
	}

	public void setReference(SalesSlip reference) {
		this.reference = reference;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public MemoType getType() {
		return type;
	}

	public void setType(MemoType type) {
		this.type = type;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Depot getDepot() {
		return depot;
	}

	public void setDepot(Depot depot) {
		this.depot = depot;
	}

}
