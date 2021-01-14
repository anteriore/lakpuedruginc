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


		BankAccount BPI3371000142 = new BankAccount( "3371000142","DB0000","BPI");
BankAccount BPI3371000134 = new BankAccount( "3371000134","DB0001","BPI");
BankAccount BDO1358001027 = new BankAccount( "1358001027","DB0002","BDO");
BankAccount PCIB5172014011 = new BankAccount( "5172014011","DB0003","PCIB");
BankAccount BPI3373003149 = new BankAccount( "3373003149","DB0004","BPI");
BankAccount BPI3373003157 = new BankAccount( "3373003157","DB0005","BPI");
BankAccount BPIMAXII3185384461 = new BankAccount( "3185384461","DB0006","BPI MAXI I");
BankAccount BPIMAXI23185384488 = new BankAccount( "3185384488","DB0007","BPI MAXI 2");
BankAccount EPCIB1230001487 = new BankAccount( "1230001487","DB0008","EPCIB");
BankAccount EPCIB1280014830 = new BankAccount( "1280014830","DB0009","EPCIB");
BankAccount MBTC72508058682 = new BankAccount( "72508058682","DB0010","MBTC");
BankAccount MBTC72508058501 = new BankAccount( "72508058501","DB0011","MBTC");
BankAccount MBTC72508058641 = new BankAccount( "72508058641","DB0012","MBTC");
BankAccount MBTC32508058622 = new BankAccount( "32508058622","DB0013","MBTC");
BankAccount ISB173009804 = new BankAccount( "173009804","DB0014","ISB");
BankAccount DBP58264059 = new BankAccount( "58264059","DB0015","DBP");
BankAccount DBP5418344051 = new BankAccount( "5418344051","DB0016","DBP");
BankAccount DBP5418344052 = new BankAccount( "5418344051","DB0017","DBP");
BankAccount BDO1350000025 = new BankAccount( "1350000025","DB0018","BDO");
BankAccount BDO168015001 = new BankAccount( "168015001","DB0019","BDO");
BankAccount MBTC7250804039 = new BankAccount( "7250804039","DB0020","MBTC");
BankAccount BDO160398282 = new BankAccount( "160398282","00000018","BDO");
BankAccount MBTC3250805854 = new BankAccount( "3250805854","00000019","MBTC");
BankAccount EPCIB1239007658 = new BankAccount( "1239007658","00000023","EPCIB");
BankAccount PSB18112001245 = new BankAccount( "18112001245","00000024","PSB");
BankAccount DBP52334559 = new BankAccount( "52334559","00000025","DBP");
BankAccount BDO160459222 = new BankAccount( "160459222","00000027","BDO");
BankAccount BDO168016938 = new BankAccount( "168016938","00000028","BDO");
BankAccount BPI3184032626 = new BankAccount( "3184032626","00000031","BPI");
BankAccount BDO168016997 = new BankAccount( "168016997","00000033","BDO");
BankAccount BDO160459230 = new BankAccount( "160459230","00000032","BDO");
BankAccount MBTC2503250805 = new BankAccount( "2503250805","00000034","MBTC");
BankAccount MBTC2507250805 = new BankAccount( "2507250805","00000035","MBTC");
BankAccount MBTC25022500029 = new BankAccount( "25022500029","00000036","MBTC");
BankAccount BPI3180004709 = new BankAccount( "3180004709","00000039","BPI");
BankAccount BPI3180004717 = new BankAccount( "3180004717","00000040","BPI");
BankAccount MBTC7250805876 = new BankAccount( "7250805876","00000041","MBTC");
BankAccount BPI3374001441 = new BankAccount( "3374001441","00000042","BPI");
BankAccount WPB101001646 = new BankAccount( "101001646","00000043","WPB");
BankAccount ALLIEDBNK1551006817 = new BankAccount( "1551006817","00000050","ALLIED BNK");
BankAccount ALLIEDBNK1551006825 = new BankAccount( "1551006825","00000051","ALLIED BNK");
BankAccount BPISA3180013597 = new BankAccount( "3180013597","00000052","BPI-SA");
BankAccount BPI3373003327 = new BankAccount( "3373003327","00000055","BPI");
BankAccount BPICA3180015654 = new BankAccount( "3180015654","00000054","BPI CA");
BankAccount BPI3378196573 = new BankAccount( "3378196573","00000060","BPI");
BankAccount BPI3378196476 = new BankAccount( "3378196476","00000061","BPI");
BankAccount BPI3375181173 = new BankAccount( "3375181173","00000062","BPI");
BankAccount UB590071221 = new BankAccount( "590071221","00000063","UB");
BankAccount USDPNB21558001499 = new BankAccount( "21558001499","PNB","USD - PNB");
BankAccount PNBUSDTD21558001499 = new BankAccount( "21558001499","00000064","PNB-USD TD");
BankAccount PNBUSD21552002747 = new BankAccount( "21552002747","00000065","PNB - USD");
BankAccount PNBALB21152002747 = new BankAccount( "21152002747","USD","PNB-ALB");
BankAccount USDACCT100160945305 = new BankAccount( "100160945305","BDO USD","USD ACCT");
BankAccount CA602900001060 = new BankAccount( "602900001060","CBS","C/A");
BankAccount CA602900001061 = new BankAccount( "602900001061","CBS","C/A");
BankAccount CBCCHINA602900001061 = new BankAccount( "602900001061","00000066","CBC-CHINA");
BankAccount MBTC2507250513166 = new BankAccount( "2507250513166","00000067","MBTC");
BankAccount PNBUSD128660037294 = new BankAccount( "128660037294","00000068","PNB-USD");
BankAccount MBTCUSD2502250004138 = new BankAccount( "2502250004138","00000069","MBTC USD");
BankAccount USDTDBPI3378201941 = new BankAccount( "3378201941","00000070","USD-TD-BPI");
BankAccount MAXI3373196079 = new BankAccount( "3373196079","BPI","MAXI");
BankAccount BPIMAXIS3183630503 = new BankAccount( "3183630503","00000071","BPI-MAXI S");
BankAccount CHINASA100300016558 = new BankAccount( "100300016558","00000058","CHINA-S/A");
BankAccount CBCCA100300016558 = new BankAccount( "100300016558","00000072","CBC-CA");


bankAccountRepository.save( BPI3371000142);
bankAccountRepository.save( BPI3371000134);
bankAccountRepository.save( BDO1358001027);
bankAccountRepository.save( PCIB5172014011);
bankAccountRepository.save( BPI3373003149);
bankAccountRepository.save( BPI3373003157);
bankAccountRepository.save( BPIMAXII3185384461);
bankAccountRepository.save( BPIMAXI23185384488);
bankAccountRepository.save( EPCIB1230001487);
bankAccountRepository.save( EPCIB1280014830);
bankAccountRepository.save( MBTC72508058682);
bankAccountRepository.save( MBTC72508058501);
bankAccountRepository.save( MBTC72508058641);
bankAccountRepository.save( MBTC32508058622);
bankAccountRepository.save( ISB173009804);
bankAccountRepository.save( DBP58264059);
bankAccountRepository.save( DBP5418344051);
bankAccountRepository.save( DBP5418344052);
bankAccountRepository.save( BDO1350000025);
bankAccountRepository.save( BDO168015001);
bankAccountRepository.save( MBTC7250804039);
bankAccountRepository.save( BDO160398282);
bankAccountRepository.save( MBTC3250805854);
bankAccountRepository.save( EPCIB1239007658);
bankAccountRepository.save( PSB18112001245);
bankAccountRepository.save( DBP52334559);
bankAccountRepository.save( BDO160459222);
bankAccountRepository.save( BDO168016938);
bankAccountRepository.save( BPI3184032626);
bankAccountRepository.save( BDO168016997);
bankAccountRepository.save( BDO160459230);
bankAccountRepository.save( MBTC2503250805);
bankAccountRepository.save( MBTC2507250805);
bankAccountRepository.save( MBTC25022500029);
bankAccountRepository.save( BPI3180004709);
bankAccountRepository.save( BPI3180004717);
bankAccountRepository.save( MBTC7250805876);
bankAccountRepository.save( BPI3374001441);
bankAccountRepository.save( WPB101001646);
bankAccountRepository.save( ALLIEDBNK1551006817);
bankAccountRepository.save( ALLIEDBNK1551006825);
bankAccountRepository.save( BPISA3180013597);
bankAccountRepository.save( BPI3373003327);
bankAccountRepository.save( BPICA3180015654);
bankAccountRepository.save( BPI3378196573);
bankAccountRepository.save( BPI3378196476);
bankAccountRepository.save( BPI3375181173);
bankAccountRepository.save( UB590071221);
bankAccountRepository.save( USDPNB21558001499);
bankAccountRepository.save( PNBUSDTD21558001499);
bankAccountRepository.save( PNBUSD21552002747);
bankAccountRepository.save( PNBALB21152002747);
bankAccountRepository.save( USDACCT100160945305);
bankAccountRepository.save( CA602900001060);
bankAccountRepository.save( CA602900001061);
bankAccountRepository.save( CBCCHINA602900001061);
bankAccountRepository.save( MBTC2507250513166);
bankAccountRepository.save( PNBUSD128660037294);
bankAccountRepository.save( MBTCUSD2502250004138);
bankAccountRepository.save( USDTDBPI3378201941);
bankAccountRepository.save( MAXI3373196079);
bankAccountRepository.save( BPIMAXIS3183630503);
bankAccountRepository.save( CHINASA100300016558);
bankAccountRepository.save( CBCCA100300016558);



		
	}
}
