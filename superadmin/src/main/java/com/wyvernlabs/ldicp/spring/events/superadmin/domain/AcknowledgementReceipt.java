package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.OrderSlipType;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.TermsOfPayment;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class AcknowledgementReceipt {
	@Id
    @GeneratedValue
    private Long id;
	private String number;
	private Date date;
	private TermsOfPayment terms;
	@OneToOne
	private Client client;
	private Double amountPaid;
	private String chequeNumber;
	private Date chequeDate;
	private Date cutOffDate;
	private Date dateCreated;
	@OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	private List<AcknowledgementPayment> payments;
	@OneToOne
	private Company company;
	@OneToOne
	private Depot depot;
	@OneToOne
	private User preparedBy;
	@OneToOne
	private User checkedBy;
	@OneToOne
	private User approvedBy;
	private String remarks;
	private Double osAmount;
	private Double siAmount;
	private String status = "Pending";
	@PrePersist
	public void init() { 
		osAmount = payments.stream().filter(payment -> payment.getReference().getSalesOrder().getType().equals(OrderSlipType.OS)).mapToDouble(AcknowledgementPayment::getAppliedAmount).sum();
		siAmount = payments.stream().filter(payment -> payment.getReference().getSalesOrder().getType().equals(OrderSlipType.DR_SI)).mapToDouble(AcknowledgementPayment::getAppliedAmount).sum();

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
	public TermsOfPayment getTerms() {
		return terms;
	}
	public void setTerms(TermsOfPayment terms) {
		this.terms = terms;
	}
	public Double getAmountPaid() {
		return amountPaid;
	}
	public void setAmountPaid(Double amountPaid) {
		this.amountPaid = amountPaid;
	}
	public String getChequeNumber() {
		return chequeNumber;
	}
	public void setChequeNumber(String chequeNumber) {
		this.chequeNumber = chequeNumber;
	}
	public Date getChequeDate() {
		return chequeDate;
	}
	public void setChequeDate(Date chequeDate) {
		this.chequeDate = chequeDate;
	}
	public Date getCutOffDate() {
		return cutOffDate;
	}
	public void setCutOffDate(Date cutOffDate) {
		this.cutOffDate = cutOffDate;
	}
	public Date getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
	public Company getCompany() {
		return company;
	}
	public void setCompany(Company company) {
		this.company = company;
	}
	public Depot getDepot() {
		return depot;
	}
	public void setDepot(Depot depot) {
		this.depot = depot;
	}
	public Client getClient() {
		return client;
	}
	public void setClient(Client client) {
		this.client = client;
	}
	public User getPreparedBy() {
		return preparedBy;
	}
	public void setPreparedBy(User preparedBy) {
		this.preparedBy = preparedBy;
	}
	public User getCheckedBy() {
		return checkedBy;
	}
	public void setCheckedBy(User checkedBy) {
		this.checkedBy = checkedBy;
	}
	public User getApprovedBy() {
		return approvedBy;
	}
	public void setApprovedBy(User approvedBy) {
		this.approvedBy = approvedBy;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public List<AcknowledgementPayment> getPayments() {
		return payments;
	}
	public void setPayments(List<AcknowledgementPayment> payments) {
		this.payments = payments;
	}
	public Double getOsAmount() {
		return osAmount;
	}
	public void setOsAmount(Double osAmount) {
		this.osAmount = osAmount;
	}
	public Double getSiAmount() {
		return siAmount;
	}
	public void setSiAmount(Double siAmount) {
		this.siAmount = siAmount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
