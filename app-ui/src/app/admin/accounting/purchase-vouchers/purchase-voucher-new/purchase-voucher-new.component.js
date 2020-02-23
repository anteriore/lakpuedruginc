var purchaseVoucherNew = {
  templateUrl: './purchase-voucher-new.html',
  controller: 'PurchaseVoucherNewController'
};

angular
  .module('admin.accounting')
  .component('purchaseVoucherNew', purchaseVoucherNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase-voucher-new', {
        parent: 'app',
        url: '/admin/accounting/purchase-voucher/new',
        component: 'purchaseVoucherNew'
      });
  });
