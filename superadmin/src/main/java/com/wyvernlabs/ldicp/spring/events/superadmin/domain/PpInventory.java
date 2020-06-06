package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * Manufacturing Order Inventory
 */
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class PpInventory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id; // pp-number
	@OneToOne
	private MoInventory moInventory;
	private String type;
	private int batchSize;
	@OneToOne
	private Company company;
	private Date dateCreated;

	@PrePersist
	protected void onCreate() {
		dateCreated = new Date();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public MoInventory getMoInventory() {
		return moInventory;
	}

	public void setMoInventory(MoInventory moInventory) {
		this.moInventory = moInventory;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getBatchSize() {
		return batchSize;
	}

	public void setBatchSize(int batchSize) {
		this.batchSize = batchSize;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
}
