package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class JobOrderCostSheetIngredient {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private Ingredient ingredient;

    private Integer costPerUnit;





    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ingredient getIngredient() {
        return ingredient;
    }

    public void setIngredient(Ingredient ingredient) {
        this.ingredient = ingredient;
    }

    public Integer getCostPerUnit() {
        return costPerUnit;
    }

    public void setCostPerUnit(Integer costPerUnit) {
        this.costPerUnit = costPerUnit;
    }
}
