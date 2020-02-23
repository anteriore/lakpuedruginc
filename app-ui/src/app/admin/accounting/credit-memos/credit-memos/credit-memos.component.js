
var creditMemo = {
  templateUrl: './credit-memos.html',
  controller: 'CreditMemoController'
};

angular
  .module('admin.accounting')
  .component('creditMemo', creditMemo)
  .config(function ($stateProvider) {
    $stateProvider
      .state('credit-memos', {
        parent: 'app',
        url: '/admin/accounting/credit-memo',
        component: 'creditMemo'
      });
  });