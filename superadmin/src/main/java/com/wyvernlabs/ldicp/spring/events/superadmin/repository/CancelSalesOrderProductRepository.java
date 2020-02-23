package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CancelSalesOrderProduct;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.SalesOrderProduct;

public interface CancelSalesOrderProductRepository extends JpaRepository<CancelSalesOrderProduct, Long> {

	CancelSalesOrderProduct findLastBySalesOrderProduct(SalesOrderProduct product);

}
