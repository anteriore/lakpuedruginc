package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.DeliveryReceipt;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.DeliveredProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrder;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.ProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderProductRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.SalesOrderRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.service.DeliveryReceiptService;

@Component
public class DeliveryReceiptData {
	@Autowired
	private DeliveryReceiptService deliveryReceiptService;
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

		DeliveryReceipt deliveryReceipt = new DeliveryReceipt();
		deliveryReceipt.setApprovedBy(user);
		deliveryReceipt.setCheckedBy(user);
		deliveryReceipt.setCompany(company);
		deliveryReceipt.setDate(new Date());
		deliveryReceipt.setNumber("OS1");
		List<DeliveredProduct> deliveredProducts = new ArrayList<DeliveredProduct>();
		
		/*for(SalesOrderProduct soProduct : salesOrder.getProducts()) {
			soProduct = salesOrderProductRepository.findOne(soProduct.getId());
			DeliveredProduct deliveredProduct = new DeliveredProduct();
			deliveredProduct.setDeliveryReceiptNo(deliveryReceipt.getNumber());
			deliveredProduct.setProduct(productRepository.findOne(soProduct.getProduct().getId()));
			deliveredProduct.setQuantity(50);
			deliveredProduct.setSalesOrderProductId(soProduct.getId());
			deliveredProducts.add(deliveredProduct);
		}
		deliveryReceipt.setDeliveredProducts(deliveredProducts);*/
		deliveryReceipt.setPreparedBy(user);
		deliveryReceipt.setReleasedBy(user);
		deliveryReceipt.setRemarks("MOCK DATA ORDER SLIP");
		deliveryReceipt.setSalesOrder(salesOrder);
		
		//deliveryReceiptService.saveDeliveryReceipt(deliveryReceipt);
	}
}
