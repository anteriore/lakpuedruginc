
var product = {
  templateUrl: './products.html',
  controller: 'ProductController'
};

angular
  .module('admin.maintenance')
  .component('product', product)
  .config(function ($stateProvider) {
    $stateProvider
      .state('products', {
        parent: 'app',
        url: '/admin/maintenance/products',
        component: 'product'
      });
  });