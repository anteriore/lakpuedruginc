package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProvinceCode;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProvinceCodeRepository;

@RestController
@RequestMapping("rest/province-codes")
public class ProvinceCodeRestController {

    @Autowired
    private ProvinceCodeRepository provinceCodeRepository;

    @GetMapping("/{id}")
    public ProvinceCode get(@PathVariable Long id) {
        return provinceCodeRepository.getOne(id);
    }

    @GetMapping()
    public List<ProvinceCode> list() {
        return provinceCodeRepository.findAll();
    }

    @PostMapping()
    public ProvinceCode upsert(@RequestBody ProvinceCode depot) {
        return provinceCodeRepository.save(depot);
    }

    @PostMapping("/delete")
    public boolean delete(@RequestBody Long id) {
        provinceCodeRepository.deleteById(id);
        return true;
    }
}