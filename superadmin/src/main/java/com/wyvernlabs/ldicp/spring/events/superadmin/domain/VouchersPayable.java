package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class VouchersPayable {
	@Id
    @GeneratedValue
    private Long id;
	private String number;
	private Date date;
	@OneToMany(fetch = FetchType.LAZY)
	private Set<Voucher> vouchers;
	@OneToOne
	private Voucher voucher;
	private Date dueDate;
	private String remarks;
	private String status = "Pending";
	@OneToOne
	private Vendor vendor;
	@OneToMany(cascade = CascadeType.ALL)
	private Set<AccountTitleEntry> accountTitles;
	@OneToOne
	private Company company;
	private double totalAmount;
	private double totalCreditAmount;
	private double totalDebitAmount;
	private String variation;
	
	@OneToOne
	private User preparedBy;
	@OneToOne
	private User approvedBy;
	
	@PrePersist
	public void init() {
		this.totalAmount = accountTitles.stream()
				.filter(accountTitleEntry -> accountTitleEntry.getAccountTitle().getType().equals("Debit"))
				.mapToDouble(AccountTitleEntry::getAmount)
				.sum();
		this.totalDebitAmount = this.totalAmount;
		this.totalCreditAmount = accountTitles.stream()
				.filter(accountTitleEntry -> accountTitleEntry.getAccountTitle().getType().equals("Credit"))
				.mapToDouble(AccountTitleEntry::getAmount)
				.sum();
	}
	
	public boolean hasEqualDebitAndCreditAmount() {
		return  accountTitles.stream()
				.filter(title-> title.getAccountTitle().equals("Credit"))
				.mapToDouble(AccountTitleEntry::getAmount)
				.sum()
				+
				accountTitles.stream().filter(title-> title.getAccountTitle().equals("Debit"))
				.mapToDouble(AccountTitleEntry::getAmount)
				.sum() == 0 ;
	}
	
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
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Date getDueDate() {
		return dueDate;
	}
	public void setDueDate(Date dueDate) {
		this.dueDate = dueDate;
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
	public Vendor getVendor() {
		return vendor;
	}
	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}
	public Set<AccountTitleEntry> getAccountTitles() {
		return accountTitles;
	}
	public void setAccountTitles(Set<AccountTitleEntry> accountTitles) {
		this.accountTitles = accountTitles;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public double getTotalCreditAmount() {
		return totalCreditAmount;
	}

	public void setTotalCreditAmount(double totalCreditAmount) {
		this.totalCreditAmount = totalCreditAmount;
	}

	public double getTotalDebitAmount() {
		return totalDebitAmount;
	}

	public void setTotalDebitAmount(double totalDebitAmount) {
		this.totalDebitAmount = totalDebitAmount;
	}

	public Voucher getVoucher() {
		return voucher;
	}

	public void setVoucher(Voucher voucher) {
		this.voucher = voucher;
	}

	

	public String getVariation() {
		return variation;
	}

	public void setVariation(String variation) {
		this.variation = variation;
	}

	public Set<Voucher> getVouchers() {
		return vouchers;
	}

	public void setVouchers(Set<Voucher> vouchers) {
		this.vouchers = vouchers;
	}

	public User getPreparedBy() {
		return preparedBy;
	}

	public void setPreparedBy(User preparedBy) {
		this.preparedBy = preparedBy;
	}

	public User getApprovedBy() {
		return approvedBy;
	}

	public void setApprovedBy(User approvedBy) {
		this.approvedBy = approvedBy;
	}
		
	
	
}
