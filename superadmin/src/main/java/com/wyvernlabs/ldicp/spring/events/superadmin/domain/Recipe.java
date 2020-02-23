package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class Recipe {
	@Id
	@GeneratedValue
	private Long id;
	private Date date;
	private String status;
	private String approvedBy;
	@OneToOne
	private Company company;
	private Date approvedDate;
	private String remarks;
	@OneToOne
	private FinishedGood finishedGood;
	@OneToOne
	private IngredientGroup activeIngredientGroup;
	
	@OneToMany(cascade = CascadeType.ALL)
	private List<IngredientGroup> ingredientGroups;


	@PrePersist
	protected void onCreate() {
		date = new Date();
	}



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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getApprovedBy() {
		return approvedBy;
	}
	public void setApprovedBy(String approvedBy) {
		this.approvedBy = approvedBy;
	}
	public Date getApprovedDate() {
		return approvedDate;
	}
	public void setApprovedDate(Date approvedDate) {
		this.approvedDate = approvedDate;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public FinishedGood getFinishedGood() {
		return finishedGood;
	}
	public void setFinishedGood(FinishedGood finishedGood) {
		this.finishedGood = finishedGood;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public IngredientGroup getActiveIngredientGroup() {
		return activeIngredientGroup;
	}

	public void setActiveIngredientGroup(IngredientGroup activeIngredientGroup) {
		this.activeIngredientGroup = activeIngredientGroup;
	}

	public List<IngredientGroup> getIngredientGroups() {
		return ingredientGroups;
	}

	public void setIngredientGroups(List<IngredientGroup> ingredientGroups) {
		this.ingredientGroups = ingredientGroups;
	}
}
