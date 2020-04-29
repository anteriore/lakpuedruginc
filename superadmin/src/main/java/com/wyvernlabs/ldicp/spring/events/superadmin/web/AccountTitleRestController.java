package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AccountTitle;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AccountTitleRepository;

@RestController
@RequestMapping("rest/account-titles")
public class AccountTitleRestController {
	@Autowired
	private AccountTitleRepository accountTitleRepository;

	@GetMapping("/{id}")
	public AccountTitle get(@PathVariable Long id) {
		return accountTitleRepository.getOne(id);
	}

	@GetMapping("/title/{name}")
	public AccountTitle getByName(@PathVariable String name) {
		return accountTitleRepository.findByTitleStartingWith(name).size() > 0
				? accountTitleRepository.findByTitleStartingWith(name).get(0)
				: null;
	}

	@GetMapping()
	public List<AccountTitle> list() {
		return accountTitleRepository.findAll();
	}

	@PostMapping()
	public AccountTitle upsert(@RequestBody AccountTitle accountTitle) {
		return accountTitleRepository.save(accountTitle);
	}

	@GetMapping("/level/{level}/parent/{parentId}")
	public List<AccountTitle> listByLevelAndParent(@PathVariable int level, @PathVariable Long parentId) {
		if (parentId < 0 && level == 1) {
			return accountTitleRepository.findByLevel(1);
		}

		AccountTitle parent = accountTitleRepository.getOne(parentId);

		return accountTitleRepository.findByLevelAndParent(level, parent);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		accountTitleRepository.deleteById(id);
		return true;
	}

}
