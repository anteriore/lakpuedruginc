var productNew = {
  templateUrl: './product-new.html',
  controller: 'ProductNewController'
};

angular
  .module('admin.maintenance')
  .component('productNew', productNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('product-new', {
        parent: 'app',
        url: '/admin/maintenance/products/new',
        component: 'productNew'
      });
  });
