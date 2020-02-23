
function PdcVoucherNewController($state, PdcVouchersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    ctrl.pdc = {
    		company: ctrl.company,
    		date: new Date()
    }
    };

  ctrl.createPdcVoucher = function (event) {
    PdcVouchersService.save(event.pdc).then(function (response) {
    	  console.log("createPdcVoucher " + JSON.stringify(response.data));
    	  alert("PDC Voucher successfully added");
    	  $state.go("pdc-vouchers");
    });

  };
}

angular
  .module('admin.accounting')
  .controller('PdcVoucherNewController', PdcVoucherNewController);
