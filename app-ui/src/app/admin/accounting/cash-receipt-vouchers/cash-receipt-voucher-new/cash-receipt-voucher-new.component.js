var cashReceiptVoucherNew = {
  templateUrl: './cash-receipt-voucher-new.html',
  controller: 'CashReceiptVoucherNewController'
};

angular
  .module('admin.accounting')
  .component('cashReceiptVoucherNew', cashReceiptVoucherNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('cash-receipt-voucher-new', {
        parent: 'app',
        url: '/admin/accounting/cash-receipt-voucher/new',
        component: 'cashReceiptVoucherNew'
      });
  });
