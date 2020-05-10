package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.*;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

@Component
public class MoCostingData {
	private static final Logger logger = LoggerFactory.getLogger(MoCostingData.class);

	@Autowired
	private MoCostingRepository moCostingRepository;
	@Autowired
	private MoInventoryRepository moInventoryRepository;
	@Autowired
	private EmployeeRepository employeeRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private MoCostingInventoryRepository moCostingInventoryRepository;
	@Autowired
	private MoCostingEmployeeRepository moCostingEmployeeRepository;

	public MoCostingData() {
	}

	@Transactional
	public void init() {
		Company c1 = companyRepository.getOne(1L);

		List<MoInventory> moInventoryList = moInventoryRepository.findByCompany(c1);

		double totalCost = 0.00;

		MoCosting moCosting = new MoCosting();
		moCosting.setCompany(c1);

		MoInventory moInventory = moInventoryList.get(0);
		Set<MoCostingInventory> moCostingInventories = new HashSet<>();
		List<Inventory> inventoryList = moInventory.getInventoryList();
		for (Inventory inventory : inventoryList) {
			MoCostingInventory moCostingInventory = new MoCostingInventory();
			moCostingInventory.setInventory(inventory);
			int inputCost = 1;
			moCostingInventory.setCost(inputCost);
			totalCost += inputCost;

			moCostingInventories.add(moCostingInventory);
		}

		Set<MoCostingEmployee> moCostingEmployees = new HashSet<>();
		Employee employee = employeeRepository.getOne(1L);
		MoCostingEmployee moCostingEmployee = new MoCostingEmployee();
		moCostingEmployee.setEmployee(employee);
		int inputHoursSpent = 2;
		moCostingEmployee.setHoursSpent(inputHoursSpent);
		moCostingEmployee.setCost(100);
		moCostingEmployees.add(moCostingEmployee);
		totalCost += 100;

		moCosting.setMoInventory(moInventory);
		moCosting.setMoCostingEmployees(moCostingEmployees);
		moCosting.setMoCostingInventories(moCostingInventories);
		moCosting.setTotalCost(totalCost);

		for (MoCostingInventory moCostingInventory : moCostingInventories) {
			moCostingInventoryRepository.save(moCostingInventory);
		}

		moCostingEmployeeRepository.save(moCostingEmployee);

		moCostingRepository.save(moCosting);
	}

}
