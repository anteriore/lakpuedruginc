package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Permission;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.PermissionRepository;

@RestController
@RequestMapping("rest/permissions")
public class PermissionRestController {
	private static final Logger logger = LoggerFactory.getLogger(PermissionRestController.class);

	private PermissionRepository permissionRepository;

	public PermissionRestController(PermissionRepository permissionRepository) {
		this.permissionRepository = permissionRepository;
	}

	@GetMapping("/{id}")
	public Permission get(@PathVariable Long id) {
		return permissionRepository.getOne(id);
	}

	@GetMapping()
	public List<Permission> list() {
		return permissionRepository.findAll();
	}

	@PostMapping()
	public Permission upsert(@RequestBody Permission permission) {
		return permissionRepository.save(permission);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		permissionRepository.delete(id);
		return true;
	}
}
