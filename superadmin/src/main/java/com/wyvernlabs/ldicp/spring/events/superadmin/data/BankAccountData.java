package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.BankAccount;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.BankAccountRepository;

@Component
public class BankAccountData {
	@Autowired
	private BankAccountRepository bankAccountRepository;
	
	public void init() {
		BankAccount bpi = new BankAccount();
		bpi.setName("Bank of the Philippine Islands");
		bpi.setAddress("6768 Ayala Ave, Legazpi Village, Makati, 1226 Metro Manila");
		bpi.setCode("BPI");
		bankAccountRepository.save(bpi);
		
		BankAccount bdo = new BankAccount();
		bdo.setName("Banco De Oro");
		bdo.setAddress("BDO Corporate Center, 7899 Makati Avenue, Makati City.");
		bdo.setCode("BDO");
		bankAccountRepository.save(bdo);

		BankAccount BPIMAXII3185384461 = new BankAccount( "3185384461","DB0006","BPI MAXI I");
BankAccount BPIMAXI23185384488 = new BankAccount( "3185384488","DB0007","BPI MAXI 2");
BankAccount EPCIB1230001487 = new BankAccount( "1230001487","DB0008","EPCIB");


	}
}
