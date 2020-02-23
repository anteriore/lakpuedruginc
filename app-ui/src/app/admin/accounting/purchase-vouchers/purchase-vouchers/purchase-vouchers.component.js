
var purchaseVoucher = {
  templateUrl: './purchase-vouchers.html',
  controller: 'PurchaseVoucherController'
};

angular
  .module('admin.accounting')
  .component('purchaseVoucher', purchaseVoucher)
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase-vouchers', {
        parent: 'app',
        url: '/admin/accounting/purchase-voucher',
        component: 'purchaseVoucher'
      });
  });