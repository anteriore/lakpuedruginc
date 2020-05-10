package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesRep;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesRepRepository;

@RestController
@RequestMapping("rest/sales-reps")
public class SalesRepRestController {

    @Autowired
    private SalesRepRepository salesRepRepository;

    @GetMapping("/{id}")
    public SalesRep get(@PathVariable Long id) {
        return salesRepRepository.getOne(id);
    }

    @GetMapping()
    public List<SalesRep> list() {
        return salesRepRepository.findAll();
    }

    @PostMapping()
    public SalesRep upsert(@RequestBody SalesRep depot) {
        return salesRepRepository.save(depot);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        salesRepRepository.deleteById(id);
        return true;
    }
}