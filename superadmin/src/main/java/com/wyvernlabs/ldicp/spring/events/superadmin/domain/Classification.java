	package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.ClassificationType;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class Classification {
	@Id
	@GeneratedValue
	private Long id;
	private String name;
	private String code;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	
	
	
}
