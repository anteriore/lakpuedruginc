var vendorNew = {
    templateUrl: './vendor-new.html',
    controller: 'VendorNewController'
  };
  
  angular
    .module('admin.maintenance')
    .component('vendorNew', vendorNew)
    .config(function ($stateProvider) {
      $stateProvider
        .state('vendor-new', {
          parent: 'app',
          url: '/admin/maintenance/vendor/new',
          component: 'vendorNew'
        });
    });
  