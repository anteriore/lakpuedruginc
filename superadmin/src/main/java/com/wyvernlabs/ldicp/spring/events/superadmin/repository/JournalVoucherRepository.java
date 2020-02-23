package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JournalVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.VouchersPayable;

public interface JournalVoucherRepository extends JpaRepository<JournalVoucher, Long> {

	@Query("SELECT MAX(jv.id) FROM JournalVoucher jv WHERE jv.status = :status")
	Long getMaxIdByStatus(@Param("status") String status);
	
	@Query("SELECT MAX(jv.id) FROM JournalVoucher jv WHERE jv.status IN :status")
	Long getMaxIdInStatus(@Param("status") String[] status);

	List<JournalVoucher> findByCompany(Company company);

	List<JournalVoucher> findByCompanyAndVoucher(Company company, Object object);

	List<JournalVoucher> findByCompanyAndVendorAndHasAdjustment(Company company, Vendor vendor, boolean b);

	List<JournalVoucher> findByCompanyAndVendorAndStatusAndHasAdjustment(Company company, Vendor vendor, String status,
			boolean b);

	List<JournalVoucher> findByCompanyAndVoucherAndStatus(Company company, Object object, String status);
	
	List<JournalVoucher> findByCompanyAndStatusAndDateBetween(Company company, String status, Date startDate, Date endDate);

	List<JournalVoucher> findByCompanyAndDateBetween(Company company, Date startDate, Date endDate);
}
