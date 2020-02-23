
var salesJournalVoucher = {
    templateUrl: './sales-journal-vouchers.html',
    controller: 'SalesJournalVoucherController'
  };
  
  angular
    .module('admin.accounting')
    .component('salesJournalVoucher', salesJournalVoucher)
    .config(function ($stateProvider) {
      $stateProvider
        .state('sales-journal-vouchers', {
          parent: 'app',
          url: '/admin/accounting/sales-journal-voucher',
          component: 'salesJournalVoucher'
        });
    });