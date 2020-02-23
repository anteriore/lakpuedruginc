package com.wyvernlabs.ldicp.spring.events.superadmin.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.CashReceiptVoucher;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;

public interface CashReceiptVoucherRepository extends JpaRepository<CashReceiptVoucher, Long> {

	List<CashReceiptVoucher> findByCompany(Company company);


	List<CashReceiptVoucher> findByCompanyAndDateBetween(Company company, Date startDate, Date endDate);

}
