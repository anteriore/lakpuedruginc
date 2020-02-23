package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class ZipCode {
	@Id
	@GeneratedValue
	private Long id;
	private String code;
	private String description;
	@OneToOne
	private ProvinceCode provinceCode;
	@OneToOne
	private RegionCode regionCode;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public ProvinceCode getProvinceCode() {
		return provinceCode;
	}
	public void setProvinceCode(ProvinceCode provinceCode) {
		this.provinceCode = provinceCode;
	}
	public RegionCode getRegionCode() {
		return regionCode;
	}
	public void setRegionCode(RegionCode regionCode) {
		this.regionCode = regionCode;
	}
	
	
}
