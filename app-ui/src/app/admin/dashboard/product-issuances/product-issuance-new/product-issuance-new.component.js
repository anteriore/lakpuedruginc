var productIssuanceNew = {
  templateUrl: './product-issuance-new.html',
  controller: 'ProductIssuanceNewController'
};

angular
  .module('admin.dashboard')
  .component('productIssuanceNew', productIssuanceNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('product-issuance-new', {
        parent: 'app',
        url: '/admin/dashboard/product-issuance/new',
        component: 'productIssuanceNew'
      });
  });
