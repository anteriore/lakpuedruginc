
function ChequePrintingFormController($state, ChequePrintingsService, VouchersPayablesService, UsersService, BankAccountsService, $rootScope) {
	  
  var ctrl = this;
  
  var currentUser = localStorage.getItem('cupventUser');
      if (currentUser != null) {
          ctrl.currentUser = JSON.parse(currentUser);
      }
  
  ctrl.$onInit = function (){
	  ctrl.company = $rootScope.selectedCompany;
	    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));

	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.user = response.data;
	  });
	  
	  BankAccountsService.list().then(function(response){
		  ctrl.bankAccounts = response.data;
	  });
	  ctrl.totalAmount = 0;
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.cp) {
      ctrl.cp = angular.copy(ctrl.cp);
    }
  };
  
  
  ctrl.selectMultipleVouchers = function (v){
	  if(ctrl.cp.payables.indexOf(v) !== -1){
		  var index = ctrl.cp.payables.indexOf(v);
		  ctrl.cp.payables.splice(index, 1);
		  ctrl.totalAmount -= v.totalAmount;
	  }else{
		  ctrl.cp.payables.push(v);
		  ctrl.totalAmount += v.totalAmount;
	  }
  };
  

  ctrl.findVouchersPayable = function() {
    VouchersPayablesService.getByCompanyAndVendorAndStatus(ctrl.cp.company.id, ctrl.cp.vendor.id, 'Approved').then(function(response) {
      ctrl.payables = response.data;
    });
  };

  ctrl.viewVp = function(vp){
	  ctrl.vp = vp;
  };
  
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
    	  cp: ctrl.cp
      }
    });
  };

  

}

angular
  .module('admin.accounting')
  .controller('ChequePrintingFormController', ChequePrintingFormController);
