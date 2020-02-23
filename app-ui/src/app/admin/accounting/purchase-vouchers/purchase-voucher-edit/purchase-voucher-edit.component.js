var purchaseVoucherEdit = {
  templateUrl: './purchase-voucher-edit.html',
  controller: 'PurchaseVoucherEditController'
};

angular
  .module('admin.accounting')
  .component('purchaseVoucherEdit', purchaseVoucherEdit)
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase-voucher-edit', {
        parent: 'app',
        url: '/admin/purchase-vouchers/edit/:purchaseVoucherId',
        component: 'purchaseVoucherEdit'
      });
  });
