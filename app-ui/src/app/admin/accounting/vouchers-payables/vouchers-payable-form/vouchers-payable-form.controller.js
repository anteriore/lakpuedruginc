
function VouchersPayableFormController($state, VouchersPayablesService, VouchersService, JournalVouchersService, PurchaseVouchersService, $rootScope) {
	  
  var ctrl = this;
  
  var currentUser = localStorage.getItem('cupventUser');
      if (currentUser != null) {
          ctrl.currentUser = JSON.parse(currentUser);
      }
  
  ctrl.$onInit = function (){
	  ctrl.company = $rootScope.selectedCompany;
	  ctrl.totalAmount = 0;
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.vp) {
      ctrl.vp = angular.copy(ctrl.vp);
    }
  };
  
  ctrl.toggleVariation = function(){
	  ctrl.vp = {
	    		company: ctrl.company,
	    		date: new Date(),
	    		accountTitles: [],
	    		variation: ctrl.vp.variation,
	    		vouchers: []
	    }
  };

  ctrl.findNewVouchers = function() {
    VouchersService.listNewVouchersByCompanyAndStatus(ctrl.company.id, 'Approved').then(function(response) {
      ctrl.vouchers = response.data;
    });
  };
  
  ctrl.findPurchaseVouchersWithoutAdjustments = function() {
	  PurchaseVouchersService.getPvWithoutAdjustmentsByCompanyAndVendorAndStatus(ctrl.company.id, ctrl.vp.vendor.id, 'Approved').then(function(response){
		  ctrl.vouchers = response.data;
		  console.log(ctrl.vouchers + " hi");
	  });
  };
  
  ctrl.findJournalVouchersWithoutAdjustments = function() {
	  JournalVouchersService.getJvWithoutAdjustmentsByCompanyAndVendorAndStatus(ctrl.company.id, ctrl.vp.vendor.id, 'Approved').then(function(response){
		  ctrl.vouchers = response.data;
		  console.log(ctrl.vouchers + " hi");
	  });
  };
  
  ctrl.selectMultipleVouchers = function (v){
	  if(ctrl.vp.vouchers.indexOf(v) !== -1){
		  var index = ctrl.vp.vouchers.indexOf(v);
		  ctrl.vp.vouchers.splice(index, 1);
		  ctrl.totalAmount -= v.totalAmount;
	  }else{
		  ctrl.vp.vouchers.push(v);
		  ctrl.totalAmount += v.totalAmount;
	  }
  };

  ctrl.selectVoucher = function (v){
	  ctrl.vp.voucher = v;
	  /*
	  ctrl.vp.siNumber = v.siNumber;
	  ctrl.vp.drNumber = v.drNumber;
	  ctrl.vp.poNumber = v.poNumber;
	  ctrl.vp.rrNumber = v.rrNumber;*/
	  ctrl.vp.vendor = v.vendor;
	  //ctrl.vp.rrDate = v.rrDate;
	  ctrl.totalAmount = 0;
	  JournalVouchersService.listAdjustmentsOfVoucherByCompany(v.id, ctrl.company.id).then(function(response){
		  ctrl.adjustments = response.data;
		  for(var i = 0; i < ctrl.adjustments.length; i++){
			  ctrl.totalAmount += ctrl.adjustments[i].totalAmount;
		  }
		  ctrl.totalAmount += ctrl.vp.voucher.totalAmount;
	  });
  };
  
  ctrl.submitForm = function () {
    ctrl.onSubmit({
      $event: {
    	  vp: ctrl.vp
      }
    });
  };

  

}

angular
  .module('admin.accounting')
  .controller('VouchersPayableFormController', VouchersPayableFormController);
