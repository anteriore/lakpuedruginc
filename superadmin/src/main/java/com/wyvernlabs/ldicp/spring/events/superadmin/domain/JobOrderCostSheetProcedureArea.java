package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class JobOrderCostSheetProcedureArea {
    @Id
    @GeneratedValue
    private Long id;

    @OneToOne
    private ProcedureArea procedureArea;

    private Integer hours;
    private Integer ratePerHour;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProcedureArea getProcedureArea() {
        return procedureArea;
    }

    public void setProcedureArea(ProcedureArea procedureArea) {
        this.procedureArea = procedureArea;
    }
}
