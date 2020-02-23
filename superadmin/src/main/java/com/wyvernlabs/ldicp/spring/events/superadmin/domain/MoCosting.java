package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class MoCosting {
    @Id
    @GeneratedValue
    private Long id;
    @OneToOne
    private MoInventory moInventory;
    @OneToOne
    private Company company;
    @ManyToMany(fetch=FetchType.EAGER)
    private Set<MoCostingEmployee> moCostingEmployees;
    @ManyToMany(fetch=FetchType.EAGER)
    private Set<MoCostingInventory> moCostingInventories;
    private double totalCost;
    private double employeeTotalCost;
    private double moTotalCost;
    @ManyToMany(fetch=FetchType.EAGER)
    private Set<JobOrder> jobOrders;

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

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Set<MoCostingEmployee> getMoCostingEmployees() {
        return moCostingEmployees;
    }

    public void setMoCostingEmployees(Set<MoCostingEmployee> moCostingEmployees) {
        this.moCostingEmployees = moCostingEmployees;
    }

    public Set<MoCostingInventory> getMoCostingInventories() {
        return moCostingInventories;
    }

    public void setMoCostingInventories(Set<MoCostingInventory> moCostingInventories) {
        this.moCostingInventories = moCostingInventories;
    }

    public double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(double totalCost) {
        this.totalCost = totalCost;
    }

    public double getEmployeeTotalCost() {
        return employeeTotalCost;
    }

    public void setEmployeeTotalCost(double employeeTotalCost) {
        this.employeeTotalCost = employeeTotalCost;
    }

    public double getMoTotalCost() {
        return moTotalCost;
    }

    public void setMoTotalCost(double moTotalCost) {
        this.moTotalCost = moTotalCost;
    }

    public Set<JobOrder> getJobOrders() {
        return jobOrders;
    }

    public void setJobOrders(Set<JobOrder> jobOrders) {
        this.jobOrders = jobOrders;
    }
}
