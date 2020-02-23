package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AccountCode;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AccountCodeRepository;

@RestController
@RequestMapping("rest/account-codes")
public class AccountCodeRestController {

	@Autowired
	private AccountCodeRepository accountCodeRepository;
	
	@GetMapping("/{id}")
    public AccountCode get(@PathVariable Long id) {
        return accountCodeRepository.getOne(id);
    }

    @GetMapping()
    public List<AccountCode> list() {
        return accountCodeRepository.findAll();
    }

    @PostMapping()
    public AccountCode upsert(@RequestBody AccountCode depot) {
        return accountCodeRepository.save(depot);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
    	accountCodeRepository.delete(id);
		return true;
    }
}