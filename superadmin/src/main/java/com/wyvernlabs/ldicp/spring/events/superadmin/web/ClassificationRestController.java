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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Classification;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.ClassificationType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClassificationRepository;

@RestController
@RequestMapping("rest/classifications")
public class ClassificationRestController {
	private static final Logger logger = LoggerFactory.getLogger(ClassificationRestController.class);

	@Autowired
	private ClassificationRepository classificationRepository;
	
	@GetMapping("/{id}")
	public Classification get(@PathVariable Long id) {
		return classificationRepository.getOne(id);
	}

	@GetMapping()
	public List<Classification> list() {
		return classificationRepository.findAll();
	}

	@PostMapping()
	public Classification upsert(@RequestBody Classification classification) {
		return classificationRepository.save(classification);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		classificationRepository.delete(id);
		return true;
	}
	
	@GetMapping("/types")
	public ClassificationType[] listTypes(){
		return ClassificationType.values();
	}

}
