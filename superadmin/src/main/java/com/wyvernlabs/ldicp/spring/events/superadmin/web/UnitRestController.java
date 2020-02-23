package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Unit;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UnitRepository;

@RestController
@RequestMapping("rest/units")
public class UnitRestController {
	private static final Logger logger = LoggerFactory.getLogger(ClientRestController.class);

	@Autowired
	private UnitRepository unitRepository;

	@GetMapping("/{id}")
	public Unit get(@PathVariable Long id) {
		return unitRepository.getOne(id);
	}

	@GetMapping()
	public List<Unit> list() {
		return unitRepository.findAll();
	}

	@PostMapping()
	public Unit upsert(@RequestBody Unit client) {
		return unitRepository.save(client);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		unitRepository.delete(id);
		return true;
	}
}
