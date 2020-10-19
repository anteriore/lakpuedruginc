package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.BankAccount;
import com.wyvernlabs.ldicp.spring.events.superadmin.helper.OffsetBasedPageRequest;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.BankAccountRepository;

@RestController
@RequestMapping("rest/bank-accounts")
public class BankAccountRestController {
	private static final Logger logger = LoggerFactory.getLogger(BankAccountRestController.class);
	@Autowired
	private BankAccountRepository bankAccountRepository;

	@GetMapping("/{id}")
	public BankAccount get(@PathVariable Long id) {
		return bankAccountRepository.getOne(id);
	}

	@GetMapping("/paginate/{itemsPerPage}/{offset}")
	public Page<BankAccount> paginate(@PathVariable("itemsPerPage") Integer itemsPerPage,
			@PathVariable("offset") Integer offset) {
		Pageable pageable = new OffsetBasedPageRequest(offset, itemsPerPage);
		return bankAccountRepository.findAll(pageable);
	}

	@GetMapping()
	public List<BankAccount> list() {
		return bankAccountRepository.findAll();
	}

	@PostMapping()
	public BankAccount upsert(@RequestBody BankAccount bankAccount) {
		return bankAccountRepository.save(bankAccount);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		bankAccountRepository.deleteById(id);
		return true;
	}
}
