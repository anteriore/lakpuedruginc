package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@SequenceGenerator(name = "VoucherSequenceGenerator", sequenceName = "purchase_voucher_sequence", allocationSize = 1)
public class PurchaseVoucher extends Voucher {
	@Column(unique = true)
	private String rrNumber;
	
	
	private boolean manual = false;
	
	
	
	public String getRrNumber() {
		return rrNumber;
	}
	public void setRrNumber(String rrNumber) {
		this.rrNumber = rrNumber;
	}
	
	public boolean isManual() {
		return manual;
	}

	public void setManual(boolean manual) {
		this.manual = manual;
	}
	

	
	
}
