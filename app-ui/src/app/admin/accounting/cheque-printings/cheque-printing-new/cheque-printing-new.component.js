var chequePrintingNew = {
  templateUrl: './cheque-printing-new.html',
  controller: 'ChequePrintingNewController'
};

angular
  .module('admin.accounting')
  .component('chequePrintingNew', chequePrintingNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('cheque-printing-new', {
        parent: 'app',
        url: '/admin/accounting/cheque-printing/new',
        component: 'chequePrintingNew'
      });
  });
