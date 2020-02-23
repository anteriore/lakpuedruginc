
function CashReceiptVoucherFormController($state, CashReceiptVouchersService, VouchersService, JournalVouchersService, UsersService, BankAccountsService, $rootScope) {
	  
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
    if (changes.crv) {
      ctrl.crv = angular.copy(ctrl.crv);
    }
  };
  
  ctrl.toggleVariation = function(){
	  ctrl.crv = {
			  	number: ctrl.crv.number,
	    		company: ctrl.company,
	    		date: new Date(),
	    		accountTitles: [],
	    		variation: ctrl.crv.variation,
	    		voucher: {},
	    		preparedBy: ctrl.crv.preparedBy
	    }
  };

  ctrl.selectVoucher = function (v){
	  ctrl.crv.voucher = v;
	  /*
	  ctrl.vp.siNumber = v.siNumber;
	  ctrl.vp.drNumber = v.drNumber;
	  ctrl.vp.poNumber = v.poNumber;
	  ctrl.vp.rrNumber = v.rrNumber;*/
	  //ctrl.vp.rrDate = v.rrDate;
	  ctrl.totalAmount = 0;
	  JournalVouchersService.listAdjustmentsOfVoucherByCompany(v.id, ctrl.company.id).then(function(response){
		  ctrl.adjustments = response.data;
		  for(var i = 0; i < ctrl.adjustments.length; i++){
			  ctrl.totalAmount += ctrl.adjustments[i].totalAmount;
		  }
		  ctrl.totalAmount += ctrl.crv.voucher.totalAmount;
	  });
  };
  
  ctrl.findNewVouchers = function() {
	 VouchersService.listNewVouchersByCompanyAndStatus(ctrl.company.id, 'Completed').then(function(response) {
	    ctrl.vouchers = response.data;
	 });
  };
	  
  
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
    	  crv: ctrl.crv
      }
    });
  };

  

}

angular
  .module('admin.accounting')
  .controller('CashReceiptVoucherFormController', CashReceiptVoucherFormController);
