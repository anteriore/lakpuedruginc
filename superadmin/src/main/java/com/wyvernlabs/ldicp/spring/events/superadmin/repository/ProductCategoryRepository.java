package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long>{

}
