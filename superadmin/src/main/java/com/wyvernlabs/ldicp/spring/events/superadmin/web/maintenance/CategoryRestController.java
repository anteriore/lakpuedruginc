package com.wyvernlabs.ldicp.spring.events.superadmin.web.maintenance;

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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Category;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CategoryRepository;

@RestController
@RequestMapping("rest/category")
public class CategoryRestController {
	private static final Logger logger = LoggerFactory.getLogger(CategoryRestController.class);

	@Autowired
	private CategoryRepository categoryRepository;

	@GetMapping("/{id}")
	public Category get(@PathVariable Long id) {
		return categoryRepository.getOne(id);
	}

	@GetMapping()
	public List<Category> list() {
		return categoryRepository.findAll();
	}

	@PostMapping()
	public Category upsert(@RequestBody Category category) {
		return categoryRepository.save(category);
	}

	@PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
		categoryRepository.deleteById(id);
		return true;
	}
}
