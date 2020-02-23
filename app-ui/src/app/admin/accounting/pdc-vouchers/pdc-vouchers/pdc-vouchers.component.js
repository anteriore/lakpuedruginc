
var pdcVoucher = {
  templateUrl: './pdc-vouchers.html',
  controller: 'PdcVoucherController'
};

angular
  .module('admin.accounting')
  .component('pdcVoucher', pdcVoucher)
  .config(function ($stateProvider) {
    $stateProvider
      .state('pdc-vouchers', {
        parent: 'app',
        url: '/admin/accounting/pdc-voucher',
        component: 'pdcVoucher'
      });
  });