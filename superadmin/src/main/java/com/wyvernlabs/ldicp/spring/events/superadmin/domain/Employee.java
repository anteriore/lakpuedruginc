package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.EmployeeStatus;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.Gender;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class Employee {
	@Id
	@GeneratedValue
	private Long id;
	private String number;
	private String lastName;
	private String firstName;
	private String givenName;
	private String middleName;
	private Double monthlySalary;
	private String taxExemptCode;
	private String atmAccountNo;
	private String pagibigId;
	private String sssNo;
	private String tinNo;
	private boolean hasInsurance;
	@Enumerated(EnumType.STRING)
	private EmployeeStatus status = EmployeeStatus.ACTIVE;
	private String levelCode;
	private Double hourlyRate;
	@Enumerated(EnumType.STRING)
	private Gender gender;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getGivenName() {
		return givenName;
	}
	public void setGivenName(String givenName) {
		this.givenName = givenName;
	}
	public String getMiddleName() {
		return middleName;
	}
	public void setMiddleName(String middleName) {
		this.middleName = middleName;
	}
	public Double getMonthlySalary() {
		return monthlySalary;
	}
	public void setMonthlySalary(Double monthlySalary) {
		this.monthlySalary = monthlySalary;
	}
	public String getTaxExemptCode() {
		return taxExemptCode;
	}
	public void setTaxExemptCode(String taxExemptCode) {
		this.taxExemptCode = taxExemptCode;
	}
	public String getAtmAccountNo() {
		return atmAccountNo;
	}
	public void setAtmAccountNo(String atmAccountNo) {
		this.atmAccountNo = atmAccountNo;
	}
	public String getPagibigId() {
		return pagibigId;
	}
	public void setPagibigId(String pagibigId) {
		this.pagibigId = pagibigId;
	}
	public String getSssNo() {
		return sssNo;
	}
	public void setSssNo(String sssNo) {
		this.sssNo = sssNo;
	}
	public String getTinNo() {
		return tinNo;
	}
	public void setTinNo(String tinNo) {
		this.tinNo = tinNo;
	}
	public boolean isHasInsurance() {
		return hasInsurance;
	}
	public void setHasInsurance(boolean hasInsurance) {
		this.hasInsurance = hasInsurance;
	}
	public String getLevelCode() {
		return levelCode;
	}
	public void setLevelCode(String levelCode) {
		this.levelCode = levelCode;
	}
	public Double getHourlyRate() {
		return hourlyRate;
	}
	public void setHourlyRate(Double hourlyRate) {
		this.hourlyRate = hourlyRate;
	}
	public Gender getGender() {
		return gender;
	}
	public void setGender(Gender gender) {
		this.gender = gender;
	}
	public EmployeeStatus getStatus() {
		return status;
	}
	public void setStatus(EmployeeStatus status) {
		this.status = status;
	}
	
	
}
