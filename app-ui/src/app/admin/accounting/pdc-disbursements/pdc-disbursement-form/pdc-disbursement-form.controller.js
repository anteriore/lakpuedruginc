
function PdcDisbursementFormController($state, PdcDisbursementsService, VouchersPayablesService, UsersService, BankAccountsService, $rootScope) {
	  
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
  
  
  ctrl.addRow = function(){
	  ctrl.pdc.cheques.push({
		  number: ctrl.chequeNumber,
		  amount: ctrl.amount,
		  date: ctrl.chequeDate,
		  remarks: ctrl.remarks
	  });

	  ctrl.chequeNumber = null;
	  ctrl.amount = null;
	  ctrl.chequeDate = null;
	  ctrl.remarks = null;
  };
  
  ctrl.deleteRow = function(index){
	  ctrl.pdc.cheques.splice(index, 1);
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
  .controller('PdcDisbursementFormController', PdcDisbursementFormController);
