package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class MoCostingInventory {
    @Id
    @GeneratedValue
    private Long id;
    @OneToOne
    private Inventory inventory;
    private double cost;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}
