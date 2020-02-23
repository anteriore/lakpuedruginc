
function VouchersPayableController($state, VouchersPayablesService, ReportsService, $rootScope) {
  var ctrl = this;
  
  ctrl.vouchersPayables = [];

  ctrl.searchNumber = '';
  ctrl.searchRRNumber = '';
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  
  ctrl.$onInit = function () {
	  ctrl.addJournalRequest = false;
	  ctrl.error = null;
	  loadVouchersPayables();
  };
  
  ctrl.exportReport = function (){
	  var reportTitle = {title: 'Report : Vouchers Payable Report'};
	  var dates = {dates: 'Date Range:' + ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
		  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate()}
	  var headers = {
			    number: 'VP No'.replace(/,/g, ''), // remove commas to avoid errors
			    date: "Date",
			    payee: "Payee",
			    amount: "Amount",
			    status: "Status"
	  };
	  
	  VouchersPayablesService.getByCompanyAndDates(ctrl.company.id, ctrl.startDate, ctrl.endDate).then(function(response){
		  console.log(response.data);
		  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print");
	  });
  };
  
  function loadVouchersPayables(){
	ctrl.company = $rootScope.selectedCompany;
	VouchersPayablesService.listByCompany(ctrl.company.id).then((response) => {
      ctrl.vouchersPayables = response.data;
      console.log("response v" + JSON.stringify(ctrl.vouchersPayables));
    });
	  
  }

  ctrl.openModal = function(vouchersPayable){
	  console.log("openModal");
    ctrl.vp = vouchersPayable;
  };
  
  ctrl.approve = function(event){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  VouchersPayablesService.approve(event.vpId, ctrl.user.id).then(function(response){
		  if(response.data){
			  alert("Approved");
			  loadVouchersPayables();
		  }
	  });
  };
  
  ctrl.print = function(){
	  window.print();
  };
  
  ctrl.goToEdit = function (id) {
	    $state.go('vouchers-payable-edit', { 'vouchersPayableId': id });
   }
/*
  ctrl.openModalApprovedItem = function(approvedItem) {
    console.log("openModalApprovedItem");
    ctrl.approvedItem = approvedItem;
  };*/
  
}

angular
  .module('admin.accounting')
  .controller('VouchersPayableController', VouchersPayableController);
