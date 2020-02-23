package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Employee;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.EmployeeStatus;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.Gender;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.EmployeeRepository;

@Component
public class EmployeeData {
	@Autowired
	private EmployeeRepository employeeRepository;
	
	public void init() {
		Employee employee = new Employee();
		employee.setAtmAccountNo("1111111");
		employee.setLevelCode("LC1");
		employee.setFirstName("John");
		employee.setGender(Gender.MALE);
		employee.setGivenName("John");
		employee.setHasInsurance(true);
		employee.setHourlyRate(50.0);
		employee.setLastName("Operio");
		employee.setMiddleName("Jerico");
		employee.setMonthlySalary(15000.00);
		employee.setNumber("EMP01");
		employee.setPagibigId("PAGIBIG1");
		employee.setSssNo("SSS1");
		employee.setStatus(EmployeeStatus.ACTIVE);
		employee.setTaxExemptCode("TAXEXEMPTCODE1");
		employee.setTinNo("1234567890");
		employeeRepository.save(employee);
		
		employee = new Employee();
		employee.setAtmAccountNo("1111111");
		employee.setLevelCode("LC1");
		employee.setFirstName("Cliff");
		employee.setGender(Gender.MALE);
		employee.setGivenName("Cliff");
		employee.setHasInsurance(true);
		employee.setHourlyRate(50.0);
		employee.setLastName("Dy");
		employee.setMiddleName("Pe");
		employee.setMonthlySalary(15000.00);
		employee.setNumber("EMP02");
		employee.setPagibigId("PAGIBIG1");
		employee.setSssNo("SSS1");
		employee.setStatus(EmployeeStatus.ACTIVE);
		employee.setTaxExemptCode("TAXEXEMPTCODE1");
		employee.setTinNo("1234567890");
		employeeRepository.save(employee);
	}
}
