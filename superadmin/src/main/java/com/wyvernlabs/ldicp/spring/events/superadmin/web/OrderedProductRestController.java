package com.wyvernlabs.ldicp.spring.events.superadmin.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wyvernlabs.ldicp.spring.events.superadmin.repository.OrderedProductRepository;

@RestController
@RequestMapping("api/ordered-products")
public class OrderedProductRestController {
	@Autowired
	private OrderedProductRepository orderedProductRepository;
	
}
