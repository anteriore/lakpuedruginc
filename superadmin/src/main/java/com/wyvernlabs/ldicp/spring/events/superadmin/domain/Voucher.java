package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.TableGenerator;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.annotation.JsonTypeInfo.As;

@Entity
@Inheritance(strategy=InheritanceType.TABLE_PER_CLASS)
@TableGenerator(table = "VOUCHER_SEQUENCE", name = "VoucherSequenceGenerator")
@JsonTypeInfo(use = com.fasterxml.jackson.annotation.JsonTypeInfo.Id.NAME, include = As.PROPERTY, property = "type")
@JsonSubTypes({
	@JsonSubTypes.Type(value = PurchaseVoucher.class, name="PJV"),
	@JsonSubTypes.Type(value = JournalVoucher.class, name="JV")
})
public abstract class Voucher {
	@Id
	@GeneratedValue(strategy = GenerationType.TABLE, generator = "VoucherSequenceGenerator")
    private Long id;
	private String number;
	private Date date;
	private String siNumber;
	@OneToOne
	private Vendor vendor;
	private String drNumber;
	private String poNumber;
	@OneToOne
	private Company company;
	private String remarks;
	private String status = "Pending";
	@OneToMany(cascade = CascadeType.ALL)
	private Set<AccountTitleEntry> accountTitles;
	private double totalAmount;
	private double totalCreditAmount;
	private double totalDebitAmount;
	@OneToOne
	private User preparedBy;
	@OneToOne
	private User approvedBy;
	
	private Date rrDate;

	private boolean hasAdjustment = false;
	
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
		return accountTitles.stream()
				.filter(title-> title.getAccountTitle().equals("Credit"))
				.mapToDouble(AccountTitleEntry::getAmount)
				.sum() == 
				accountTitles.stream().filter(title-> title.getAccountTitle().equals("Debit"))
				.mapToDouble(AccountTitleEntry::getAmount)
				.sum() ;
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

	public String getSiNumber() {
		return siNumber;
	}

	public void setSiNumber(String siNumber) {
		this.siNumber = siNumber;
	}

	public Vendor getVendor() {
		return vendor;
	}

	public void setVendor(Vendor vendor) {
		this.vendor = vendor;
	}

	public String getDrNumber() {
		return drNumber;
	}

	public void setDrNumber(String drNumber) {
		this.drNumber = drNumber;
	}

	public String getPoNumber() {
		return poNumber;
	}

	public void setPoNumber(String poNumber) {
		this.poNumber = poNumber;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
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

	public Set<AccountTitleEntry> getAccountTitles() {
		return accountTitles;
	}

	public void setAccountTitles(Set<AccountTitleEntry> accountTitles) {
		this.accountTitles = accountTitles;
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

	public Date getRrDate() {
		return rrDate;
	}

	public void setRrDate(Date rrDate) {
		this.rrDate = rrDate;
	}

	public boolean isHasAdjustment() {
		return hasAdjustment;
	}

	public void setHasAdjustment(boolean hasAdjustment) {
		this.hasAdjustment = hasAdjustment;
	}
	
	
}
