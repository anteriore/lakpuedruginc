package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.RegionCode;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.RegionCodeRepository;

@RestController
@RequestMapping("rest/region-codes")
public class RegionCodeRestController {

	@Autowired
	private RegionCodeRepository regionCodeRepository;
	
	@GetMapping("/{id}")
    public RegionCode get(@PathVariable Long id) {
        return regionCodeRepository.getOne(id);
    }

    @GetMapping()
    public List<RegionCode> list() {
        return regionCodeRepository.findAll();
    }

    @PostMapping()
    public RegionCode upsert(@RequestBody RegionCode depot) {
        return regionCodeRepository.save(depot);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
    	regionCodeRepository.delete(id);
		return true;
    }
}