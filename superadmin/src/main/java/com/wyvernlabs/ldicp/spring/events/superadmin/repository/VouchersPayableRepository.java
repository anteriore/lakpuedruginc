package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.VouchersPayable;

public interface VouchersPayableRepository extends JpaRepository<VouchersPayable, Long>{

	List<VouchersPayable> findByCompany(Company company);

	@Query("SELECT MAX(vp.id) FROM VouchersPayable vp WHERE vp.status = :status")
	Long getMaxIdByStatus(@Param("status") String status);
	
	@Query("SELECT MAX(vp.id) FROM VouchersPayable vp WHERE vp.status IN :status")
	Long getMaxIdInStatus(@Param("status") String[] status);

	List<VouchersPayable> findByCompanyAndVendor(Company company, Vendor vendor);

	List<VouchersPayable> findByCompanyAndVendorAndStatus(Company company, Vendor vendor, String status);

	List<VouchersPayable> findByCompanyAndStatusAndDateBetween(Company company, String status, Date startDate, Date endDate);

	List<VouchersPayable> findByCompanyAndDateBetween(Company company, Date startDate, Date endDate);

}
