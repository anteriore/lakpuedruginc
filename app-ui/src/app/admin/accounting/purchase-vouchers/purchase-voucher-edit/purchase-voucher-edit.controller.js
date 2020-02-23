
function PurchaseVoucherEditController($state, $stateParams, PurchaseVouchersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    
    console.log('pjvId: ' + JSON.stringify($stateParams.purchaseVoucherId));
    
    PurchaseVouchersService.get($stateParams.purchaseVoucherId).then(function(response){
    	ctrl.pv = response.data;
    	ctrl.pv.preparedBy = ctrl.user;
    	console.log("asdasd" + JSON.stringify(ctrl.pv));
    });
    
  };

  ctrl.editPurchaseVoucher = function (event) {
    PurchaseVouchersService.save(event.pv).then(function (response) {
    	  console.log("editPurchaseVoucher " + JSON.stringify(response.data));
        $state.go('purchase-vouchers');
    });

  };
}

angular
  .module('admin.accounting')
  .controller('PurchaseVoucherEditController', PurchaseVoucherEditController);
