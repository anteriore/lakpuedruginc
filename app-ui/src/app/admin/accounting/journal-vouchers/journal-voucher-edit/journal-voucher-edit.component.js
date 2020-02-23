var journalVoucherEdit = {
  templateUrl: './journal-voucher-edit.html',
  controller: 'JournalVoucherEditController'
};

angular
  .module('admin.accounting')
  .component('journalVoucherEdit', journalVoucherEdit)
  .config(function ($stateProvider) {
    $stateProvider
      .state('journal-voucher-edit', {
        parent: 'app',
        url: '/admin/journal-vouchers/edit/:journalVoucherId',
        component: 'journalVoucherEdit'
      });
  });
