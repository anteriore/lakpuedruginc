
var returnSlip = {
  templateUrl: './return-slips.html',
  controller: 'ReturnSlipController'
};

angular
  .module('admin.sales')
  .component('returnSlip', returnSlip)
  .config(function ($stateProvider) {
    $stateProvider
      .state('return-slips', {
        parent: 'app',
        url: '/admin/sales/return-slip',
        component: 'returnSlip'
      });
  });