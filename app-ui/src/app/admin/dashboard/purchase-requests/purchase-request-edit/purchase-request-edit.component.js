var purchaseRequestEdit = {
  templateUrl: './purchase-request-edit.html',
  controller: 'PurchaseRequestEditController'
};

angular
  .module('admin.dashboard')
  .component('purchaseRequestEdit', purchaseRequestEdit)
  .config(function ($stateProvider) {
    $stateProvider
      .state('purchase-request-edit', {
        parent: 'app',
        url: '/admin/dashboard/purchase-request/edit:prfId',
        component: 'purchaseRequestEdit'
      });
  });
