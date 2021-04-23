package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;

@RestController
@RequestMapping("rest/depots")
public class DepotRestController {
    private static final Logger logger = LoggerFactory.getLogger(DepotRestController.class);
    @Autowired
    private DepotRepository depotRepository;
    @Autowired
	private CompanyRepository companyRepository;

    @GetMapping("/{id}")
    public Depot get(@PathVariable Long id) {
        return depotRepository.getOne(id);
    }

    @GetMapping()
    public List<Depot> list() {
        return depotRepository.findAll();
    }

	@GetMapping("/company/{companyId}")
	public List<Depot> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return depotRepository.findByCompany(company);
	}

    @PostMapping()
    public Depot upsert(@RequestBody Depot depot) {
        return depotRepository.save(depot);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        depotRepository.deleteById(id);
        return true;
    }
}
