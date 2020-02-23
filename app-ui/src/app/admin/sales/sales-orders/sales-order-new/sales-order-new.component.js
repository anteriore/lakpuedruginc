var salesOrderNew = {
  templateUrl: './sales-order-new.html',
  controller: 'SalesOrderNewController'
};

angular
  .module('admin.sales')
  .component('salesOrderNew', salesOrderNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('sales-order-new', {
        parent: 'app',
        url: '/admin/sales/sales-order/new',
        component: 'salesOrderNew'
      });
  });
