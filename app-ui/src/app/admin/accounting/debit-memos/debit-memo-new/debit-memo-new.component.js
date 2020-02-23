var debitMemoNew = {
  templateUrl: './debit-memo-new.html',
  controller: 'DebitMemoNewController'
};

angular
  .module('admin.accounting')
  .component('debitMemoNew', debitMemoNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('debit-memo-new', {
        parent: 'app',
        url: '/admin/accounting/debit-memo/new',
        component: 'debitMemoNew'
      });
  });
