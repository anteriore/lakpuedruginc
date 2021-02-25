package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Manufacturing Order Inventory
 */
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class MoInventory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id; // mo-number
	private Integer moNumber;
	private Integer lotNumber;
	@OneToOne
	private FinishedGood finishedGood;
	@OneToOne
	private Recipe recipe;
	@OneToOne
	private IngredientGroup ingredientGroup;

	private String type;

	//@Transient
	//private String moName;
	@ManyToMany(fetch = FetchType.EAGER)
	private List<Inventory> inventoryList;
	private int batchSize;
	private int remainingBatchSize;
	@OneToOne
	private Company company;
	private Date dateCreated;

	@PrePersist
	protected void onCreate() {
		dateCreated = new Date();
	}
	/*
	public String getMoName() {
		return finishedGood.getName() + " " + getTypeLabel();
	}
	*/
	public String getTypeLabel() {
		if (type.equals("RM")) {
			return ingredientGroup.getName();
		}

		return "";
	}

	public IngredientGroup getIngredientGroup() {
		return ingredientGroup;
	}

	public void setIngredientGroup(IngredientGroup ingredientGroup) {
		this.ingredientGroup = ingredientGroup;
	}

	public Integer getLotNumber() {
		return lotNumber;
	}

	public void setLotNumber(Integer lotNumber) {
		this.lotNumber = lotNumber;
	}

	public int getRemainingBatchSize() {
		return remainingBatchSize;
	}

	public void setRemainingBatchSize(int remainingBatchSize) {
		this.remainingBatchSize = remainingBatchSize;
	}

	public Integer getMoNumber() {
		return moNumber;
	}

	public void setMoNumber(Integer moNumber) {
		this.moNumber = moNumber;
	}
	/*
	public void setMoName(String moName) {
		this.moName = moName;
	}
	*/

	public Long getId() {
		return id;
	}

	public FinishedGood getFinishedGood() {
		return finishedGood;
	}

	public void setFinishedGood(FinishedGood finishedGood) {
		this.finishedGood = finishedGood;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<Inventory> getInventoryList() {
		return inventoryList;
	}

	public void setInventoryList(List<Inventory> inventoryList) {
		this.inventoryList = inventoryList;
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
