
var sales = {
  bindings: {
    sales: '<'
  },
  templateUrl: './sales.html',
  controller: 'SalesController'
};

angular
  .module('admin.sales')
  .component('sales', sales)
  .config(function ($stateProvider) {
    $stateProvider
      .state('sales', {
        parent: 'app',
        url: '/admin/sales',
        component: 'sales'
      });
  });