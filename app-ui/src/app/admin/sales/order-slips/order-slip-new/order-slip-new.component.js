var orderSlipNew = {
  templateUrl: './order-slip-new.html',
  controller: 'OrderSlipNewController'
};

angular
  .module('admin.sales')
  .component('orderSlipNew', orderSlipNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('order-slip-new', {
        parent: 'app',
        url: '/admin/sales/order-slip/new',
        component: 'orderSlipNew'
      });
  });
