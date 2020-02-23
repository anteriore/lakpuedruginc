
var vouchersPayable = {
  templateUrl: './vouchers-payables.html',
  controller: 'VouchersPayableController'
};

angular
  .module('admin.accounting')
  .component('vouchersPayable', vouchersPayable)
  .config(function ($stateProvider) {
    $stateProvider
      .state('vouchers-payables', {
        parent: 'app',
        url: '/admin/accounting/vouchers-payable',
        component: 'vouchersPayable'
      });
  });