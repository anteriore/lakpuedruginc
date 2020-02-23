
function PrintPurchaseVoucherController($state, PurchaseVouchersService, $stateParams, $rootScope) {
  var ctrl = this;
  
  console.log("purchaseVoucherId", $stateParams.purchaseVoucherId);
  
  PurchaseVouchersService.get($stateParams.purchaseVoucherId).then(function(res) {
    ctrl.pv = res.data;
    ctrl.approvedBy = ctrl.pv.approvedBy != null ? ctrl.pv.approvedBy.firstName + " " + ctrl.pv.approvedBy.lastName : "";
    ctrl.preparedBy = ctrl.pv.preparedBy.firstName + " " + ctrl.pv.preparedBy.lastName;
  }).then(() => {
    setTimeout(function(){
      window.print();
      window.close();
    }, 0);
  });;
}

angular
  .module('admin.shared')
  .controller('PrintPurchaseVoucherController', PrintPurchaseVoucherController);
