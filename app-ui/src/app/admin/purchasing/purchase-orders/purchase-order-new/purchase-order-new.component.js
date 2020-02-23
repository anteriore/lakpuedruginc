var purchaseOrderNew = {
  templateUrl: './purchase-order-new.html',
  controller: 'PurchaseOrderNewController'
};

angular
  .module('admin.purchasing')
  .component('purchaseOrderNew', purchaseOrderNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase-order-new-new', {
        parent: 'app',
        url: '/admin/purchasing/new',
        component: 'purchaseOrderNew'
      });
  });
