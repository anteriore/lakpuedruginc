package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@SequenceGenerator(name = "VoucherSequenceGenerator", sequenceName = "journal_voucher_sequence", allocationSize = 1)
public class JournalVoucher extends Voucher{
	private String rrNumber;
	@OneToOne(optional = true)
	private Voucher voucher;
	private boolean adjustment = false;
	
	
	public boolean isAdjustment() {
		return adjustment;
	}
	public void setAdjustment(boolean adjustment) {
		this.adjustment = adjustment;
	}
	public String getRrNumber() {
		return rrNumber;
	}
	public void setRrNumber(String rrNumber) {
		this.rrNumber = rrNumber;
	}
	public Voucher getVoucher() {
		return voucher;
	}
	public void setVoucher(Voucher voucher) {
		this.voucher = voucher;
	}
	
	
	
}
