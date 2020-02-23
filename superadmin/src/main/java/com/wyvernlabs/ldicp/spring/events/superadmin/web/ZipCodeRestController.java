package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ZipCode;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ZipCodeRepository;

@RestController
@RequestMapping("rest/zip-codes")
public class ZipCodeRestController {

	@Autowired
	private ZipCodeRepository zipCodeRepository;
	
	@GetMapping("/{id}")
    public ZipCode get(@PathVariable Long id) {
        return zipCodeRepository.getOne(id);
    }

    @GetMapping()
    public List<ZipCode> list() {
        return zipCodeRepository.findAll();
    }

    @PostMapping()
    public ZipCode upsert(@RequestBody ZipCode depot) {
        return zipCodeRepository.save(depot);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
    	zipCodeRepository.delete(id);
		return true;
    }
}