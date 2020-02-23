var productReceivingNew = {
  templateUrl: './product-receiving-new.html',
  controller: 'ProductReceivingNewController'
};

angular
  .module('admin.dashboard')
  .component('productReceivingNew', productReceivingNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('product-receiving-new', {
        parent: 'app',
        url: '/admin/dashboard/product-receiving/new',
        component: 'productReceivingNew'
      });
  });
