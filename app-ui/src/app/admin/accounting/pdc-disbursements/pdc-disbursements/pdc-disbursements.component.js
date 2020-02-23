
var pdcDisbursement = {
  templateUrl: './pdc-disbursements.html',
  controller: 'PdcDisbursementController'
};

angular
  .module('admin.accounting')
  .component('pdcDisbursement', pdcDisbursement)
  .config(function ($stateProvider) {
    $stateProvider
      .state('pdc-disbursements', {
        parent: 'app',
        url: '/admin/accounting/pdc-disbursement',
        component: 'pdcDisbursement'
      });
  });