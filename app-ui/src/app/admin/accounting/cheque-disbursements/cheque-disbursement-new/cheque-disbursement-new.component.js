var chequeDisbursementNew = {
  templateUrl: './cheque-disbursement-new.html',
  controller: 'ChequeDisbursementNewController'
};

angular
  .module('admin.accounting')
  .component('chequeDisbursementNew', chequeDisbursementNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('cheque-disbursement-new', {
        parent: 'app',
        url: '/admin/accounting/cheque-disbursement/new',
        component: 'chequeDisbursementNew'
      });
  });
