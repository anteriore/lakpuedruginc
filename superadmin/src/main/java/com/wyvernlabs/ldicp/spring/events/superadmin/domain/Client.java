package com.wyvernlabs.ldicp.spring.events.superadmin.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
@Entity
public class Client {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable = false, unique = true)
	private Long id;
	private String code;
	private String name;
	private String tin;
	private String vat;
	private String proprietor;
	private String businessAddress;
	private String lineOfBusiness;
	private String telephoneNumbers;
	@OneToOne
	private SalesRep salesRep;
	@OneToOne
	private ClusterCode clusterCode;
	@OneToOne
	private InstitutionalCode institutionalCode;
	private int terms;
	private String status = "Active";
	private Double maxCreditLimit;
	private Double discount;
	private int yearsInBusiness;
public Client(){
	
}
	public Client(String code,String name,String Address,String proprietor,String telephoneNumbers,int terms, String tin,String vat)
	{
		this.code=code;
		this.name=name;
		this.businessAddress=Address;
		this.deliveryAddress=Address;
		this.proprietor=proprietor;
		this.telephoneNumbers=telephoneNumbers;
		this.terms=terms;
		this.tin=tin;
		this.vat=vat;
	}

	public String getProprietor() {
		return proprietor;
	}

	public void setProprietor(String proprietor) {
		this.proprietor = proprietor;
	}

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	Set<ClientReferences> clientReferencesList;
	private String deliveryAddress;

	public String getBusinessAddress() {
		return businessAddress;
	}

	public void setBusinessAddress(String businessAddress) {
		this.businessAddress = businessAddress;
	}

	public String getLineOfBusiness() {
		return lineOfBusiness;
	}

	public void setLineOfBusiness(String lineOfBusiness) {
		this.lineOfBusiness = lineOfBusiness;
	}

	public String getTelephoneNumbers() {
		return telephoneNumbers;
	}

	public void setTelephoneNumbers(String telephoneNumbers) {
		this.telephoneNumbers = telephoneNumbers;
	}

	public int getYearsInBusiness() {
		return yearsInBusiness;
	}

	public void setYearsInBusiness(int yearsInBusiness) {
		this.yearsInBusiness = yearsInBusiness;
	}

	public Set<ClientReferences> getClientReferencesList() {
		return clientReferencesList;
	}

	public void setClientReferencesList(Set<ClientReferences> clientReferencesList) {
		this.clientReferencesList = clientReferencesList;
	}

	@OneToOne
	private Company company;

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTin() {
		return tin;
	}

	public void setTin(String tin) {
		this.tin = tin;
	}


	public String getVat() {
		return vat;
	}

	public void setVat(String vat) {
		this.vat = vat;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	@Override
	public String toString() {
		return "Client [id=" + id + ", code=" + code + ", name=" + name + ", tin=" + tin + ", company=" + company + "]";
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		result = prime * result + ((company == null) ? 0 : company.hashCode());
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((tin == null) ? 0 : tin.hashCode());
		return result;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public SalesRep getSalesRep() {
		return salesRep;
	}

	public void setSalesRep(SalesRep salesRep) {
		this.salesRep = salesRep;
	}

	public ClusterCode getClusterCode() {
		return clusterCode;
	}

	public void setClusterCode(ClusterCode clusterCode) {
		this.clusterCode = clusterCode;
	}

	public InstitutionalCode getInstitutionalCode() {
		return institutionalCode;
	}

	public void setInstitutionalCode(InstitutionalCode institutionalCode) {
		this.institutionalCode = institutionalCode;
	}

	public int getTerms() {
		return terms;
	}

	public void setTerms(int terms) {
		this.terms = terms;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Double getMaxCreditLimit() {
		return maxCreditLimit;
	}

	public void setMaxCreditLimit(Double maxCreditLimit) {
		this.maxCreditLimit = maxCreditLimit;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

}
