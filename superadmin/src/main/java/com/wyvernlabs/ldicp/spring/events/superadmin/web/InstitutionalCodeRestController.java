package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.InstitutionalCode;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.InstitutionalCodeRepository;

@RestController
@RequestMapping("rest/institutional-codes")
public class InstitutionalCodeRestController {

    @Autowired
    private InstitutionalCodeRepository institutionalCodeRepository;

    @GetMapping("/{id}")
    public InstitutionalCode get(@PathVariable Long id) {
        return institutionalCodeRepository.getOne(id);
    }

    @GetMapping()
    public List<InstitutionalCode> list() {
        return institutionalCodeRepository.findAll();
    }

    @PostMapping()
    public InstitutionalCode upsert(@RequestBody InstitutionalCode depot) {
        return institutionalCodeRepository.save(depot);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        institutionalCodeRepository.deleteById(id);
        return true;
    }
}
