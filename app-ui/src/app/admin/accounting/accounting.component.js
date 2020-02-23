
var accounting = {
  bindings: {
    accounting: '<'
  },
  templateUrl: './accounting.html',
  controller: 'AccountingController'
};

angular
  .module('admin.accounting')
  .component('accounting', accounting)
  .config(function ($stateProvider) {
    $stateProvider
      .state('accounting', {
        parent: 'app',
        url: '/admin/accounting',
        component: 'accounting'
      });
  });