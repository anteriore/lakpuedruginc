package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import org.springframework.stereotype.Component;

@Component
public class CompanyData {

    private CompanyRepository companyRepository;

    public CompanyData(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    public void init() {
        Company c1 = new Company("Lakpue Drug Inc.");
        System.out.println(companyRepository.save(c1));

        Company c2 = new Company("La Croesus Pharma, Inc.");
        companyRepository.save(c2);

        Company c3 = new Company("Fanfreluche Enterprises Inc.");
        companyRepository.save(c3);
    }
}
