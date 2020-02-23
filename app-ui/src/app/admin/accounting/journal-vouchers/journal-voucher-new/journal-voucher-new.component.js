var journalVoucherNew = {
  templateUrl: './journal-voucher-new.html',
  controller: 'JournalVoucherNewController'
};

angular
  .module('admin.accounting')
  .component('journalVoucherNew', journalVoucherNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('journal-voucher-new', {
        parent: 'app',
        url: '/admin/accounting/journal-voucher/new',
        component: 'journalVoucherNew'
      });
  });
