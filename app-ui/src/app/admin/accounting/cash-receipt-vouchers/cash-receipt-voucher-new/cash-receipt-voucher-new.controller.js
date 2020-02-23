
function CashReceiptVoucherNewController($state, CashReceiptVouchersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    ctrl.crv = {
    		company: ctrl.company,
    		date: new Date(),
    		accountTitles: [],
    		variation: 'New',
    		preparedBy: ctrl.user
    }
    };

  ctrl.createCashReceiptVoucher = function (event) {
    CashReceiptVouchersService.save(event.crv).then(function (response) {
    	  console.log("createCashReceiptVoucher " + JSON.stringify(response.data));
        $state.go('cash-receipt-vouchers');
    });

  };
}

angular
  .module('admin.accounting')
  .controller('CashReceiptVoucherNewController', CashReceiptVoucherNewController);
