package com.wyvernlabs.ldicp.spring.events.superadmin.data;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.AccountTitle;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.AccountTitleRepository;

@Component
public class AccountTitleData {
	@Autowired
	private AccountTitleRepository accountTitleRepository;
	
	public void init() {
		List<AccountTitle> accountTitles = new ArrayList<AccountTitle>();
		//Assets
		AccountTitle assets = new AccountTitle("Assets", "Debit");
		AccountTitle currentAssets = new AccountTitle("Current Assets", "Debit", assets);
		AccountTitle accountsReceivable = new AccountTitle("Accounts Receivable", "Debit", currentAssets);
		AccountTitle cashOnHandAndInBank = new AccountTitle("Cash On Hand And In Bank", "Debit", currentAssets);
		AccountTitle vouchersPayable = new AccountTitle("Vouchers Payable", "Debit", currentAssets);
		accountTitles.add(assets);
		accountTitles.add(currentAssets);
		accountTitles.add(accountsReceivable);
		accountTitles.add(cashOnHandAndInBank);
		accountTitles.add(vouchersPayable);
		//Liabilities
		AccountTitle liabilities = new AccountTitle("Liabilities", "Credit");
		AccountTitle currentLiabilities = new AccountTitle("Current Liabilities", "Credit", liabilities);
		AccountTitle cashInBank = new AccountTitle("Cash In Bank", "Credit", liabilities);
		accountTitles.add(liabilities);
		accountTitles.add(currentLiabilities);
		accountTitles.add(cashInBank);
		
		accountTitleRepository.saveAll(accountTitles);
	}
}
