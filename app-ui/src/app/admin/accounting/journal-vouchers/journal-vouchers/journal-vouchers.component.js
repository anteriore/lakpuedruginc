
var journalVoucher = {
  templateUrl: './journal-vouchers.html',
  controller: 'JournalVoucherController'
};

angular
  .module('admin.accounting')
  .component('journalVoucher', journalVoucher)
  .config(function ($stateProvider) {
    $stateProvider
      .state('journal-vouchers', {
        parent: 'app',
        url: '/admin/accounting/journal-voucher',
        component: 'journalVoucher'
      });
  });