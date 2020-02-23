
function PdcVoucherFormController($state, PdcVouchersService, PdcDisbursementsService, UsersService, BankAccountsService, $rootScope) {
	  
  var ctrl = this;
  
  var currentUser = localStorage.getItem('currentUser');
      if (currentUser != null) {
          ctrl.currentUser = JSON.parse(currentUser);
      }
  
  ctrl.$onInit = function (){
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.pdc) {
      ctrl.pdc = angular.copy(ctrl.pdc);
    }
  };
  
  ctrl.loadDisbursements = function(){
	  PdcDisbursementsService.listByStatus("Pending").then(function(response){
		  ctrl.disbursements = response.data;
	  });
  };
  
  
  ctrl.getDisbursement = function(d){
	  console.log(d);
	  ctrl.pdc.disbursement = d;
  }
  
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
    	  pdc: ctrl.pdc
      }
    });
  };

  

}

angular
  .module('admin.accounting')
  .controller('PdcVoucherFormController', PdcVoucherFormController);
