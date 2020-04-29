package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;
import java.util.Set;

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
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoCosting;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.MoCostingInventory;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MoCostingEmployeeRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MoCostingInventoryRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.MoCostingRepository;

@RestController
@RequestMapping("rest/moCosting")
public class MoCostingRestController {
    private static final Logger logger = LoggerFactory.getLogger(MoCostingRestController.class);

    @Autowired
    private MoCostingRepository moCostingRepository;
    @Autowired
    private MoCostingEmployeeRepository moCostingEmployeeRepository;
    @Autowired
    private MoCostingInventoryRepository moCostingInventoryRepository;
    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping
    public MoCosting upsert(@RequestBody MoCosting moCosting) {

        Set<MoCostingInventory> moCostingInventories = moCosting.getMoCostingInventories();

        for (MoCostingInventory moCostingInventory : moCostingInventories) {
            moCostingInventoryRepository.save(moCostingInventory);
        }

        return moCostingRepository.save(moCosting);
    }

    @GetMapping("/{id}")
    public MoCosting get(@PathVariable Long id) {
        return moCostingRepository.getOne(id);
    }

    @GetMapping("/company/{companyId}")
    public List<MoCosting> listByCompany(@PathVariable Long companyId) {
        Company company = companyRepository.getOne(companyId);
        return moCostingRepository.findByCompany(company);
    }

    @GetMapping()
    public List<MoCosting> list() {
        return moCostingRepository.findAll();
    }

}
