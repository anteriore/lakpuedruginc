
function CashReceiptVoucherController($state, CashReceiptVouchersService, ReportsService,  $rootScope) {
  var ctrl = this;
  
  
  ctrl.$onInit = function () {
	  ctrl.addJournalRequest = false;
	  ctrl.error = null;
	  loadCashReceiptVouchers();
  };
  
  
  ctrl.exportReport = function (){
	  var reportTitle = {title: 'Report : Cash Receipt Voucher Report'};
	  var dates = {dates: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  var headers = {
			    number: 'CRV No'.replace(/,/g, ''), // remove commas to avoid errors
			    date: "Date",
			    payee: "Bank",
			    voucher: "Voucher",
			    amount: "Amount",
	  };
	  
	  CashReceiptVouchersService.getByCompanyAndDates(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  console.log(response.data);
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print");
	  });
  };
  
  function loadCashReceiptVouchers(){
	ctrl.company = $rootScope.selectedCompany;
	CashReceiptVouchersService.list().then(function(response){
      ctrl.cashReceiptVouchers = response.data;
      console.log("response v" + JSON.stringify(ctrl.cashReceiptVouchers));
    });
	  
  }

  
  ctrl.openModal = function(cashReceiptVoucher){
	  console.log("openModal");
    ctrl.crv = cashReceiptVoucher;
  };
  
  
  ctrl.print = function(){
	  window.print();
  };
  
/*
  ctrl.openModalApprovedItem = function(approvedItem) {
    console.log("openModalApprovedItem");
    ctrl.approvedItem = approvedItem;
  };*/
  
}

angular
  .module('admin.accounting')
  .controller('CashReceiptVoucherController', CashReceiptVoucherController);
