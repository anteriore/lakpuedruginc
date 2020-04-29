package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class JobOrderCostSheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, unique = true)
    private Long id;

    @OneToOne
    private FinishedGood finishedGood;
    @OneToOne
    private Recipe recipe;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<JobOrderCostSheetIngredient> jobOrderCostSheetIngredients;
    @ManyToMany(fetch = FetchType.EAGER)
    private Set<JobOrderCostSheetProcedureArea> jobOrderCostSheetProcedureAreas;

    private Integer grandTotal;

    @OneToOne
    private Company company;

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

    public Set<JobOrderCostSheetIngredient> getJobOrderCostSheetIngredients() {
        return jobOrderCostSheetIngredients;
    }

    public void setJobOrderCostSheetIngredients(Set<JobOrderCostSheetIngredient> jobOrderCostSheetIngredients) {
        this.jobOrderCostSheetIngredients = jobOrderCostSheetIngredients;
    }

    public Set<JobOrderCostSheetProcedureArea> getJobOrderCostSheetProcedureAreas() {
        return jobOrderCostSheetProcedureAreas;
    }

    public void setJobOrderCostSheetProcedureAreas(
            Set<JobOrderCostSheetProcedureArea> jobOrderCostSheetProcedureAreas) {
        this.jobOrderCostSheetProcedureAreas = jobOrderCostSheetProcedureAreas;
    }

    public Integer getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(Integer grandTotal) {
        this.grandTotal = grandTotal;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }
}
