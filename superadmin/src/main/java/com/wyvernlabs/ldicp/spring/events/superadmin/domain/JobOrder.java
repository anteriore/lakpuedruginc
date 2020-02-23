package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class JobOrder {
	@Id
	@GeneratedValue
	private Long id;
	@OneToOne
	private MoInventory moInventory;
	private Date date;
	@OneToOne
	private Procedure procedure;
	private String output;
	@OneToOne
	private Employee employee;
	private Date timeIn;
	private Date timeOut;
	private int numberOfHours;
	
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

	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Procedure getProcedure() {
		return procedure;
	}
	public void setProcedure(Procedure procedure) {
		this.procedure = procedure;
	}
	public String getOutput() {
		return output;
	}
	public void setOutput(String output) {
		this.output = output;
	}
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public Date getTimeIn() {
		return timeIn;
	}
	public void setTimeIn(Date timeIn) {
		this.timeIn = timeIn;
	}

	public Date getTimeOut() {
		return timeOut;
	}

	public void setTimeOut(Date timeOut) {
		this.timeOut = timeOut;
	}

	public int getNumberOfHours() {
		return numberOfHours;
	}
	public void setNumberOfHours(int numberOfHours) {
		this.numberOfHours = numberOfHours;
	}
	
	
}
