package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JobOrderCostSheet;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JobOrderCostSheetIngredient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobOrderCostSheetIngredientRepository extends JpaRepository<JobOrderCostSheetIngredient, Long> {
}
