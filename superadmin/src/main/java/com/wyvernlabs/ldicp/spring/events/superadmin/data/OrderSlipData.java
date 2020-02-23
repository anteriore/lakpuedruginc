package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderSlip;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.OrderedProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.OrderSlipService;

@Component
public class OrderSlipData {
	@Autowired
	private OrderSlipService orderSlipService;
	@Autowired
	private SalesOrderRepository salesOrderRepository;
	@Autowired
	private CompanyRepository companyRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private SalesOrderProductRepository salesOrderProductRepository;
	public void init() {
		SalesOrder salesOrder = salesOrderRepository.findOne(1L);
		Company company = companyRepository.findOne(1L);
		User user = userRepository.findOne(1L);

		OrderSlip orderSlip = new OrderSlip();
		orderSlip.setApprovedBy(user);
		orderSlip.setCheckedBy(user);
		orderSlip.setCompany(company);
		orderSlip.setDate(new Date());
		orderSlip.setNumber("OS1");
		List<OrderedProduct> orderedProducts = new ArrayList<OrderedProduct>();
		for(SalesOrderProduct soProduct : salesOrder.getProducts()) {
			soProduct = salesOrderProductRepository.findOne(soProduct.getId());
			OrderedProduct orderedProduct = new OrderedProduct();
			orderedProduct.setOrderSlipNo(orderSlip.getNumber());
			//orderedProduct.setProduct(productRepository.findOne(soProduct.getProduct().getId()));
			orderedProduct.setQuantity(50);
			orderedProduct.setSalesOrderProductId(soProduct.getId());
			orderedProducts.add(orderedProduct);
		}
		orderSlip.setOrderedProducts(orderedProducts);
		orderSlip.setPreparedBy(user);
		orderSlip.setReleasedBy(user);
		orderSlip.setRemarks("MOCK DATA ORDER SLIP");
		orderSlip.setSalesOrder(salesOrder);
		
		//orderSlipService.saveOrderSlip(orderSlip);
	}
}
