
var purchaseRequest = {
  templateUrl: './purchase-requests.html',
  controller: 'PurchaseRequestController'
};

angular
  .module('admin.dashboard')
  .component('purchaseRequest', purchaseRequest)
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase-requests', {
        parent: 'app',
        url: '/admin/dashboard/purchase-request',
        component: 'purchaseRequest'
      });
  });