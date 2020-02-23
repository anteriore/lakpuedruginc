package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Client;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesRep;
import com.wyvernlabs.ldicp.spring.events.superadmin.helper.OffsetBasedPageRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClientRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesRepRepository;

@RestController
@RequestMapping("rest/clients")
public class ClientRestController {
	private static final Logger logger = LoggerFactory.getLogger(ClientRestController.class);

	private ClientRepository clientRepository;
	private CompanyRepository companyRepository;
	private SalesRepRepository salesRepRepository;
	public ClientRestController(ClientRepository clientRepository, CompanyRepository companyRepository, SalesRepRepository salesRepRepository) {
		this.clientRepository = clientRepository;
		this.companyRepository = companyRepository;
		this.salesRepRepository = salesRepRepository;
	}

	@GetMapping("/{id}")
	public Client get(@PathVariable Long id) {
		return clientRepository.getOne(id);
	}

	@GetMapping()
	public List<Client> list() {
		return clientRepository.findAll();
	}

	@PostMapping()
	public Client upsert(@RequestBody Client client) {
		return clientRepository.save(client);
	}

	@GetMapping("/company/{companyId}")
	public List<Client> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.findOne(companyId);
		return clientRepository.findByCompany(company);
	}
	
	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		clientRepository.delete(id);
		return true;
	}
	
	@GetMapping("/report/company/{companyId}/sales-rep/{salesRepId}")
	public List<Client> reportBySalesRep(@PathVariable Long companyId, @PathVariable Long salesRepId){
		Company company = companyRepository.findOne(companyId);
		SalesRep salesRep = salesRepRepository.findOne(salesRepId);
		return clientRepository.findByCompanyAndSalesRep(company, salesRep);
	}
	
	 @GetMapping("/company/{companyId}/paginate/{itemsPerPage}/{offset}")
	    public Page<Client> paginateByCompany(@PathVariable("companyId") Long companyId, @PathVariable("itemsPerPage") Integer itemsPerPage, @PathVariable("offset") Integer offset) {
	        Pageable pageable = new OffsetBasedPageRequest(offset, itemsPerPage);
			Company company = companyRepository.findOne(companyId);
	        return clientRepository.findByCompany(company, pageable);
	    }

}
