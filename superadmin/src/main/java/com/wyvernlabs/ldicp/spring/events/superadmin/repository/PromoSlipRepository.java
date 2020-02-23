package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PromoSlip;

public interface PromoSlipRepository extends JpaRepository<PromoSlip, Long> {

	List<PromoSlip> findByCompany(Company company);

}
