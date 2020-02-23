package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.JournalVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.PurchaseVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Vendor;

public interface PurchaseVoucherRepository extends JpaRepository<PurchaseVoucher, Long> {

	List<PurchaseVoucher> findByCompany(Company company);
	
	@Query("SELECT MAX(pv.id) FROM PurchaseVoucher pv WHERE status = :status")
	public Long getMaxIdByStatus(@Param("status") String status);
	
	@Query("SELECT MAX(pv.id) FROM PurchaseVoucher pv WHERE status IN :status")
	public Long getMaxIdInStatus(@Param("status") String[] status);

	PurchaseVoucher findByCompanyAndNumber(Company company, String number);

	List<PurchaseVoucher> findByCompanyAndVendorAndHasAdjustment(Company company, Vendor vendor, boolean b);

	List<PurchaseVoucher> findByCompanyAndVendorAndStatusAndHasAdjustment(Company company, Vendor vendor, String status,
			boolean b);

	List<PurchaseVoucher> findByCompanyAndStatus(Company company, String status);
	
	List<PurchaseVoucher> findByCompanyAndStatusAndDateBetween(Company company, String status, Date startDate, Date endDate);

	List<PurchaseVoucher> findByCompanyAndDateBetween(Company company, Date startDate, Date endDate);

	
}
