
package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class CashReceiptVoucher {
	@Id
    @GeneratedValue
    private Long id;
    private String number;
    private Date date;
    private String variation;
    @OneToOne
    private BankAccount bankAccount;
    private String referenceNumber;
    private String arNumber;
    @OneToOne(optional = true)
    private Voucher voucher;
    @OneToMany(cascade = CascadeType.ALL)
    private Set<AccountTitleEntry> accountTitles;
    private String remarks;
    @OneToOne
    private User preparedBy;
    @OneToOne
    private Company company;
    private Double amount;
    
    @PrePersist
	public void init() {
		this.amount = accountTitles.stream()
				.filter(accountTitleEntry -> accountTitleEntry.getAccountTitle().getType().equals("Debit"))
				.mapToDouble(AccountTitleEntry::getAmount)
				.sum();
	}
    /**
     * @return the id
     */
    public Long getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * @return the number
     */
    public String getNumber() {
        return number;
    }

    /**
     * @param number the number to set
     */
    public void setNumber(String number) {
        this.number = number;
    }

    /**
     * @return the bankAccount
     */
    public BankAccount getBankAccount() {
        return bankAccount;
    }

    /**
     * @param bankAccount the bankAccount to set
     */
    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    /**
     * @return the referenceNumber
     */
    public String getReferenceNumber() {
        return referenceNumber;
    }

    /**
     * @param referenceNumber the referenceNumber to set
     */
    public void setReferenceNumber(String referenceNumber) {
        this.referenceNumber = referenceNumber;
    }

    /**
     * @return the arNumber
     */
    public String getArNumber() {
        return arNumber;
    }

    /**
     * @param arNumber the arNumber to set
     */
    public void setArNumber(String arNumber) {
        this.arNumber = arNumber;
    }

    
    public Voucher getVoucher() {
		return voucher;
	}

	public void setVoucher(Voucher voucher) {
		this.voucher = voucher;
	}

	/**
     * @return the accountTitles
     */
    public Set<AccountTitleEntry> getAccountTitles() {
        return accountTitles;
    }

    /**
     * @param accountTitles the accountTitles to set
     */
    public void setAccountTitles(Set<AccountTitleEntry> accountTitles) {
        this.accountTitles = accountTitles;
    }

    /**
     * @return the remarks
     */
    public String getRemarks() {
        return remarks;
    }

    /**
     * @param remarks the remarks to set
     */
    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    /**
     * @return the preparedBy
     */
    public User getPreparedBy() {
        return preparedBy;
    }

    /**
     * @param preparedBy the preparedBy to set
     */
    public void setPreparedBy(User preparedBy) {
        this.preparedBy = preparedBy;
    }

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getVariation() {
		return variation;
	}

	public void setVariation(String variation) {
		this.variation = variation;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
    
	


}