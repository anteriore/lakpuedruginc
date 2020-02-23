var creditMemoNew = {
  templateUrl: './credit-memo-new.html',
  controller: 'CreditMemoNewController'
};

angular
  .module('admin.accounting')
  .component('creditMemoNew', creditMemoNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('credit-memo-new', {
        parent: 'app',
        url: '/admin/accounting/credit-memo/new',
        component: 'creditMemoNew'
      });
  });
