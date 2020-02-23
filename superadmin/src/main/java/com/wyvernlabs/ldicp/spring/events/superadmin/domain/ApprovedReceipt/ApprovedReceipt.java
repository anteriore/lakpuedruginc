package com.wyvernlabs.ldicp.spring.events.superadmin.domain.ApprovedReceipt;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class ApprovedReceipt {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String number;
    private Date date;
    @OneToOne
    private User receivedBy;
    @OneToOne
    private Company company;
    private int maxContainers;
    private double specifiedGravity;
    private Date dateCreated;
    private Date modified;
    @OneToOne
    private ReceivingReceipt receivingReceipt; //RR

    private int receivedQuantity;
    private int approvedQuantity;
    private int rejectedQuantity;
    private int qcSamples;
    private int totalQuantity;
    private Date expiration;
    private Date bestBefore;
    private Date reevaluation;
    private Date retest;
    @OneToOne
    private Item item;
    private String unit;
    private String controlNumber;

    private String remarks;

    
    public String getRrNumber() {
        return  receivingReceipt.getNumber();
    }

    private int getContainerSeries() {
        return 0;
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

    public User getReceivedBy() {
        return receivedBy;
    }

    public void setReceivedBy(User receivedBy) {
        this.receivedBy = receivedBy;
    }

    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public int getMaxContainers() {
        return maxContainers;
    }

    public void setMaxContainers(int maxContainers) {
        this.maxContainers = maxContainers;
    }

    public double getSpecifiedGravity() {
        return specifiedGravity;
    }

    public void setSpecifiedGravity(double specifiedGravity) {
        this.specifiedGravity = specifiedGravity;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Date getModified() {
        return modified;
    }

    public void setModified(Date modified) {
        this.modified = modified;
    }
    
    public ReceivingReceipt getReceivingReceipt() {
		return receivingReceipt;
	}

	public void setReceivingReceipt(ReceivingReceipt receivingReceipt) {
		this.receivingReceipt = receivingReceipt;
	}

    public int getReceivedQuantity() {
        return receivedQuantity;
    }

    public void setReceivedQuantity(int receivedQuantity) {
        this.receivedQuantity = receivedQuantity;
    }

    public int getApprovedQuantity() {
        return approvedQuantity;
    }

    public void setApprovedQuantity(int approvedQuantity) {
        this.approvedQuantity = approvedQuantity;
    }

    public int getRejectedQuantity() {
        return rejectedQuantity;
    }

    public void setRejectedQuantity(int rejectedQuantity) {
        this.rejectedQuantity = rejectedQuantity;
    }

    public int getQcSamples() {
        return qcSamples;
    }

    public void setQcSamples(int qcSamples) {
        this.qcSamples = qcSamples;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public Date getExpiration() {
        return expiration;
    }

    public void setExpiration(Date expiration) {
        this.expiration = expiration;
    }

    public Date getBestBefore() {
        return bestBefore;
    }

    public void setBestBefore(Date bestBefore) {
        this.bestBefore = bestBefore;
    }

    public Date getReevaluation() {
        return reevaluation;
    }

    public void setReevaluation(Date reevaluation) {
        this.reevaluation = reevaluation;
    }

    public Date getRetest() {
        return retest;
    }

    public void setRetest(Date retest) {
        this.retest = retest;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getControlNumber() {
        return controlNumber;
    }

    public void setControlNumber(String controlNumber) {
        this.controlNumber = controlNumber;
    }

    public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}


    @Override
    public String toString() {
        return "ApprovedReceipt{" +
                "id=" + id +
                ", number='" + number + '\'' +
                ", date=" + date +
                ", receivedBy=" + receivedBy +
                ", company=" + company +
                ", maxContainers=" + maxContainers +
                ", specifiedGravity=" + specifiedGravity +
                ", dateCreated=" + dateCreated +
                ", modified=" + modified +
                ", receivingReceipt=" + receivingReceipt +
                ", receivedQuantity=" + receivedQuantity +
                ", approvedQuantity=" + approvedQuantity +
                ", rejectedQuantity=" + rejectedQuantity +
                ", qcSamples=" + qcSamples +
                ", totalQuantity=" + totalQuantity +
                ", expiration=" + expiration +
                ", bestBefore=" + bestBefore +
                ", reevaluation=" + reevaluation +
                ", retest=" + retest +
                ", item=" + item +
                ", unit='" + unit + '\'' +
                ", controlNumber='" + controlNumber + '\'' +
                ", remarks='" + remarks + '\'' +
                '}';
    }
}
