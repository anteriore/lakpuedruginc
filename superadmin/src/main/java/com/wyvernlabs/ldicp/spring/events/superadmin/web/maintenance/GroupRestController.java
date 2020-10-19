package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Group;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.GroupRepository;

@RestController
@RequestMapping("rest/group")
public class GroupRestController {
	private static final Logger logger = LoggerFactory.getLogger(GroupRestController.class);

	private GroupRepository groupRepository;
	private CompanyRepository companyRepository;

	public GroupRestController(GroupRepository groupRepository, CompanyRepository companyRepository) {
		this.groupRepository = groupRepository;
		this.companyRepository = companyRepository;
	}

	@GetMapping("/{id}")
	public Group get(@PathVariable Long id) {
		return groupRepository.getOne(id);
	}

	@GetMapping()
	public List<Group> list() {
		return groupRepository.findAll();
	}

	@PostMapping()
	public Group upsert(@RequestBody Group group) {
		return groupRepository.save(group);
	}

	@GetMapping("/company/{companyId}")
	public List<Group> listByCompany(@PathVariable Long companyId) {
		Company company = companyRepository.getOne(companyId);
		return groupRepository.findByCompany(company);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		groupRepository.deleteById(id);
		return true;
	}
}
