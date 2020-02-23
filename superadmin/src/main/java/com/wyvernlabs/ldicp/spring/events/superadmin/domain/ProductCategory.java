package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class ProductCategory {
	@Id
	@GeneratedValue
	private Long id;
	private String title;
	private String code;
	private String description;
	@OneToOne
	private ProductDivision productDivision;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
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
	public ProductDivision getProductDivision() {
		return productDivision;
	}
	public void setProductDivision(ProductDivision productDivision) {
		this.productDivision = productDivision;
	}
}
