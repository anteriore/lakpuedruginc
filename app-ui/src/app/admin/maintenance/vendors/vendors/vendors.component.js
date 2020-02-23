
var vendor = {
  templateUrl: './vendors.html',
  controller: 'VendorController'
};

angular
  .module('admin.maintenance')
  .component('vendor', vendor)
  .config(function ($stateProvider) {
    $stateProvider
      .state('vendors', {
        parent: 'app',
        url: '/admin/maintenance/vendor',
        component: 'vendor'
      });
  });