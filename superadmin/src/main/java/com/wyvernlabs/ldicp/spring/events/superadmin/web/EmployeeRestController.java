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

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Employee;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.EmployeeRepository;

@RestController
@RequestMapping("rest/employees")
public class EmployeeRestController {
	private static final Logger logger = LoggerFactory.getLogger(EmployeeRestController.class);
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@GetMapping("/{id}")
    public Employee get(@PathVariable Long id) {
        return employeeRepository.getOne(id);
    }

    @GetMapping()
    public List<Employee> list() {
        return employeeRepository.findAll();
    }

    @PostMapping()
    public Employee upsert(@RequestBody Employee depot) {
        return employeeRepository.save(depot);
    }
    
    @PostMapping("/delete")
	public boolean delete(@RequestBody Long id) {
    	employeeRepository.delete(id);
		return true;
	}

}
