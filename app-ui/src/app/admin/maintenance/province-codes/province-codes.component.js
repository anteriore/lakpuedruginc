
var provinceCode = {
  templateUrl: './province-codes.html',
  controller: 'ProvinceCodeController'
};

angular
  .module('admin.maintenance')
  .component('provinceCode', provinceCode)
  .config(function ($stateProvider) {
    $stateProvider
      .state('province-codes', {
        parent: 'app',
        url: '/admin/maintenance/province-code',
        component: 'provinceCode'
      });
  });