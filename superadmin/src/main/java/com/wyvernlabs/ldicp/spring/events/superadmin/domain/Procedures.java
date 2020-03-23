package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class Procedures {
	@Id
	@GeneratedValue
	private Long id;
	private String code;
	private String name;
	@OneToOne
	private ProcedureArea procedureArea;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public ProcedureArea getProcedureArea() {
		return procedureArea;
	}

	public void setProcedureArea(ProcedureArea procedureArea) {
		this.procedureArea = procedureArea;
	}

}
