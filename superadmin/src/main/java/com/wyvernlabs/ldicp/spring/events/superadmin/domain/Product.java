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
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	@OneToOne
	private FinishedGood finishedGood;
	private String lotNumber;
	private Date expiration;
	@OneToOne
	private Classification classification;
	@OneToOne
	private ProductCategory category;
	@OneToOne
	private ProductDivision division;
	@OneToOne
	private Unit smallUnit;
	@OneToOne
	private Unit bigUnit;
	private int quantityPerBox;
	private String packageDescription;
	private Double unitPrice;
	private int reorderLevel;
	@OneToOne
	private Company company;
	@OneToOne
	private Depot depot;
	private String status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getLotNumber() {
		return lotNumber;
	}

	public void setLotNumber(String lotNumber) {
		this.lotNumber = lotNumber;
	}

	public Date getExpiration() {
		return expiration;
	}

	public void setExpiration(Date expiration) {
		this.expiration = expiration;
	}

	public Classification getClassification() {
		return classification;
	}

	public void setClassification(Classification classification) {
		this.classification = classification;
	}

	public ProductCategory getCategory() {
		return category;
	}

	public void setCategory(ProductCategory category) {
		this.category = category;
	}

	public ProductDivision getDivision() {
		return division;
	}

	public void setDivision(ProductDivision division) {
		this.division = division;
	}

	public Unit getSmallUnit() {
		return smallUnit;
	}

	public void setSmallUnit(Unit smallUnit) {
		this.smallUnit = smallUnit;
	}

	public Unit getBigUnit() {
		return bigUnit;
	}

	public void setBigUnit(Unit bigUnit) {
		this.bigUnit = bigUnit;
	}

	public int getQuantityPerBox() {
		return quantityPerBox;
	}

	public void setQuantityPerBox(int quantityPerBox) {
		this.quantityPerBox = quantityPerBox;
	}

	public String getPackageDescription() {
		return packageDescription;
	}

	public void setPackageDescription(String packageDescription) {
		this.packageDescription = packageDescription;
	}

	public Double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public int getReorderLevel() {
		return reorderLevel;
	}

	public void setReorderLevel(int reorderLevel) {
		this.reorderLevel = reorderLevel;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public FinishedGood getFinishedGood() {
		return finishedGood;
	}

	public void setFinishedGood(FinishedGood finishedGood) {
		this.finishedGood = finishedGood;
	}

	public Depot getDepot() {
		return depot;
	}

	public void setDepot(Depot depot) {
		this.depot = depot;
	}

}
