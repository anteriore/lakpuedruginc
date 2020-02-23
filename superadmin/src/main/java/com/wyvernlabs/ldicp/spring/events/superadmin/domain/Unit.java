package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class Unit {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String code;
    
    
	public Unit() {
	}

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
