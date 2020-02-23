
var regionCode = {
  templateUrl: './region-codes.html',
  controller: 'RegionCodeController'
};

angular
  .module('admin.maintenance')
  .component('regionCode', regionCode)
  .config(function ($stateProvider) {
    $stateProvider
      .state('region-codes', {
        parent: 'app',
        url: '/admin/maintenance/region-code',
        component: 'regionCode'
      });
  });