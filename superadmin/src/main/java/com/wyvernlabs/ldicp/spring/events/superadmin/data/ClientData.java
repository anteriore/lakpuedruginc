package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Client;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ClientReferences;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesRep;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClientRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesRepRepository;

@Component
public class ClientData {
	private CompanyRepository companyRepository;
	private ClientRepository clientRepository;
	@Autowired
	private SalesRepRepository salesRepRepository;
	
	public ClientData(CompanyRepository companyRepository, ClientRepository clientRepository) {
		this.companyRepository = companyRepository;
		this.clientRepository = clientRepository;
	}
	
	public void init() {
		Company company = companyRepository.getOne(1L);
		SalesRep salesRep1 = new SalesRep();
		salesRep1.setCode("SR1");
		salesRep1.setName("Sales Rep 1");
		salesRep1 = salesRepRepository.save(salesRep1);
		Client client1 = new Client();
		client1.setCode("C1");
		client1.setCompany(company);
		client1.setName("Jollibee");
		client1.setTin("1234567890");
		client1.setSalesRep(salesRep1);
		clientRepository.save(client1);


		

		
		Client client2 = new Client();
		client2.setCode("C2");
		client2.setCompany(company);
		client2.setName("McDo");
		client2.setTin("0987654321");
		client2.setSalesRep(salesRep1);
		clientRepository.save(client2);

		Client client3 = new Client();
		client3.setCode("C3");
		client3.setCompany(company);
		client3.setName("Ferry Farm Supply");
		client3.setBusinessAddress("Barangay Sulipan, Apalit Pampanga");
		client3.setDeliveryAddress("Barangay Sulipan Apalit Pampanga");
		client3.setLineOfBusiness("Poultry Supply");
		client3.setTelephoneNumbers("09255679951/045 302 9968");
		client3.setYearsInBusiness(2);
		client3.setProprietor("Jenny Manahan");
		client3.setTin("1234567890");
		client3.setSalesRep(salesRep1);

		Set<ClientReferences> referencesList = new HashSet<>();
		ClientReferences cr1 = new ClientReferences();
		cr1.setType("Bank");
		cr1.setName("Eastwest bank");
		cr1.setBranch("Apalit Pampanga");
		cr1.setTelephoneNumber("");
		referencesList.add(cr1);

		ClientReferences cr2 = new ClientReferences();
		cr2.setType("Bank");
		cr2.setName("Metro bank");
		cr2.setBranch("Apalit Pampanga");
		cr2.setTelephoneNumber("");
		referencesList.add(cr2);

		ClientReferences cr3 = new ClientReferences();
		cr3.setType("Supplier");
		cr3.setName("Unahin");
		cr3.setBranch("Angeles Pampanga");
		cr3.setTelephoneNumber("");
		referencesList.add(cr3);

		ClientReferences cr4 = new ClientReferences();
		cr4.setType("Supplier");
		cr4.setName("Sunjin");
		cr4.setBranch("San Fernando");
		cr4.setTelephoneNumber("");
		referencesList.add(cr4);

		client3.setClientReferencesList(referencesList);
		clientRepository.save(client3);




		//Client(String code,String name,String Address,String proprietor,String telephoneNumbers,int terms, String tin,String vat)
	
		//Client clientN = new Client("CM1","shollibee","Shmadress","SHmoprietor","teliphone1010101",30,"tin1020","vat1010");
		//clientRepository.save(clientN);
		
	


















	}
	
	
}
