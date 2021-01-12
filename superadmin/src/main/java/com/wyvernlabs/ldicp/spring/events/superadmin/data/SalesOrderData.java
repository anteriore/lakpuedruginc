package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Client;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Depot;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.FinishedGood;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.enums.OrderSlipType;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ClientRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.DepotRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.FinishedGoodRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.SalesOrderService;

@Component
public class SalesOrderData {
	@Autowired
	private SalesOrderService salesOrderService;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private ClientRepository clientRepository;
	@Autowired
	private FinishedGoodRepository fgRepository;
	@Autowired
	private DepotRepository depotRepository;

	public void init() {
		Company company = companyRepository.getOne(1L);
		User user = userRepository.getOne(1L);
		Client client = clientRepository.getOne(1L);
		FinishedGood fg = fgRepository.getOne(1L);
		Depot depot = depotRepository.getOne(1L);
		SalesOrder salesOrder = new SalesOrder();
		salesOrder.setApprovedBy(user);
		salesOrder.setCheckedBy(user);
		salesOrder.setClient(client);
		salesOrder.setCompany(company);
		salesOrder.setDate(new Date());
		salesOrder.setNumber("SO12345");
		salesOrder.setPreparedBy(user);
		List<SalesOrderProduct> products = new ArrayList<SalesOrderProduct>();
		SalesOrderProduct salesProduct = new SalesOrderProduct();
		salesProduct.setFinishedGood(fg);
		salesProduct.setQuantity(50);
		salesProduct.setCompany(company);
		salesProduct.setSoNumber(salesOrder.getNumber());
		salesProduct.setDepot(depot);
		salesProduct.setUnitPrice(50D);
		products.add(salesProduct);
		salesOrder.setProducts(products);
		salesOrder.setRemarks("remarks 1");
		salesOrder.setType(OrderSlipType.DR_SI);
		salesOrder.setDepot(depot);
		salesOrderService.saveSalesOrder(salesOrder);

		
	}
}
