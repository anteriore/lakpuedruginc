
var chequePrinting = {
  templateUrl: './cheque-printings.html',
  controller: 'ChequePrintingController'
};

angular
  .module('admin.accounting')
  .component('chequePrinting', chequePrinting)
  .config(function ($stateProvider) {
    $stateProvider
      .state('cheque-printings', {
        parent: 'app',
        url: '/admin/accounting/cheque-printing',
        component: 'chequePrinting'
      });
  });