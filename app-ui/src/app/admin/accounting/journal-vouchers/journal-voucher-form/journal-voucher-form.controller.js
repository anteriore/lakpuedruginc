
function JournalVoucherFormController($state, JournalVouchersService, VouchersService, PurchaseOrdersService, UsersService, $rootScope) {
	  
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
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.jv) {
      ctrl.jv = angular.copy(ctrl.jv);
    }
  };
  
  ctrl.toggleAdjustment = function(flag){
	  ctrl.jv = {
	    		company: ctrl.company,
	    		date: new Date(),
	    		accountTitles: [],
	    		adjustment: flag,
	    		type: "JV",
	    		preparedBy: ctrl.user
	    }
  };

  ctrl.findNewVouchers = function() {
	  ctrl.company = $rootScope.selectedCompany;
    VouchersService.listNewVouchersByCompany(ctrl.company.id).then(function(response) {
      ctrl.vouchers = response.data;
    });
  };

  ctrl.selectVoucher = function (v){
	  ctrl.jv.voucher = v;
	  ctrl.jv.siNumber = v.siNumber;
	  ctrl.jv.drNumber = v.drNumber;
	  ctrl.jv.poNumber = v.poNumber;
	  ctrl.jv.rrNumber = v.rrNumber;
	  ctrl.jv.vendor = v.vendor;
	  ctrl.jv.rrDate = v.rrDate;
  };
  
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
    	  jv: ctrl.jv
      }
    });
  };

  

}

angular
  .module('admin.accounting')
  .controller('JournalVoucherFormController', JournalVoucherFormController);
