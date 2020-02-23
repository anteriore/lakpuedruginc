
function CreditMemoController($state, CreditMemosService, ReportsService, UsersService, $rootScope, _) {
  var ctrl = this;
  ctrl.creditMemos = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addCreditMemo = false;
	  ctrl.error = null;
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
  };
  
  ctrl.selectDepot = function (){
	  loadCreditMemos();
  };
  
  function loadCreditMemos(){
	  CreditMemosService.listByDepot(ctrl.userAssignedDepot.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.creditMemos = response.data;
	  });
  }
  
  ctrl.searchPrf = function(event){
	  ctrl.creditMemoTable.DataTable.search(event).draw();
  };
  
  ctrl.createNewCreditMemo = function (event) {
	    console.log('createNewCreditMemo');
	    $state.go('credit-memo-new');
  };
  
  ctrl.openModal = function(creditMemo){
	  console.log("show modal" +  ctrl.showModal);
	  console.log("creditMemo" + JSON.stringify(creditMemo));
	  ctrl.creditMemo = creditMemo;
	  $('#creditMemoInfoModal').modal('show');
	  
  };
  
  ctrl.exportReport = function () {
	  var reportTitle = {title: 'Report : Credit Debit Memo Summary Report'};
	  var dates = {date: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  
	  var headers = {
			    title: 'NO.'.replace(/,/g, ''), // remove commas to avoid errors
			    credit: "TYPE",
			    date: "DATE",
			    client: "CLIENT",
			    os:"OS / DR",
			    amount: "AMOUNT",
			    remarks: "REMARKS"
	  };
	  CreditMemosService.getCMDMSummaryReport(ctrl.userAssignedDepot.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  console.log(response.data);
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print");
	  });
  }
  
}

angular
  .module('admin.accounting')
  .controller('CreditMemoController', CreditMemoController);
