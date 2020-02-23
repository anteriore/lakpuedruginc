package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class ChequePrinting {
	@Id
    @GeneratedValue
    private Long id;
	private String number;
	@OneToMany
	private List<VouchersPayable> payables;
	private String payeeName;
	@OneToOne
	private Vendor vendor;
	private String chequeNumber;
	private String chequeDate;
	@OneToOne
	private BankAccount bankAccount;
	@OneToOne
	private Company company;
	private Double totalAmount;
	private String amountString;
	private String remarks;
	private String status = "Pending";
	@OneToOne
	private User approvedBy;
	
	@PrePersist
	public void beforeSave() {
		totalAmount = payables.stream().mapToDouble(VouchersPayable::getTotalAmount).sum();
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public List<VouchersPayable> getPayables() {
		return payables;
	}
	public void setPayables(List<VouchersPayable> payables) {
		this.payables = payables;
	}
	public String getPayeeName() {
		return payeeName;
	}
	public void setPayeeName(String payeeName) {
		this.payeeName = payeeName;
	}
	public String getChequeNumber() {
		return chequeNumber;
	}
	public void setChequeNumber(String chequeNumber) {
		this.chequeNumber = chequeNumber;
	}
	public String getChequeDate() {
		return chequeDate;
	}
	public void setChequeDate(String chequeDate) {
		this.chequeDate = chequeDate;
	}
	public BankAccount getBankAccount() {
		return bankAccount;
	}
	public void setBankAccount(BankAccount bankAccount) {
		this.bankAccount = bankAccount;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getAmountString() {
		return amountString;
	}
	public void setAmountString(String amountString) {
		this.amountString = amountString;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public User getApprovedBy() {
		return approvedBy;
	}

	public void setApprovedBy(User approvedBy) {
		this.approvedBy = approvedBy;
	}
	
	
	
}
