package com.wyvernlabs.ldicp.spring.events.superadmin.web.users;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;

@RestController
@RequestMapping("rest/companies")
public class CompanyRestController {
    private static final Logger logger = LoggerFactory.getLogger(CompanyRestController.class);

    private CompanyRepository companyRepository;

    public CompanyRestController(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    @GetMapping("/{id}")
    public Company get(@PathVariable Long id) {
        return companyRepository.getOne(id);
    }

    @GetMapping()
    public List<Company> list() {
        return companyRepository.findAll();
    }

    @PostMapping()
    public Company upsert(@RequestBody Company company) {
        return companyRepository.save(company);
    }

}
