var pdcDisbursementNew = {
  templateUrl: './pdc-disbursement-new.html',
  controller: 'PdcDisbursementNewController'
};

angular
  .module('admin.accounting')
  .component('pdcDisbursementNew', pdcDisbursementNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('pdc-disbursement-new', {
        parent: 'app',
        url: '/admin/accounting/pdc-disbursement/new',
        component: 'pdcDisbursementNew'
      });
  });
