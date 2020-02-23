
var institutionalCode = {
  templateUrl: './institutional-codes.html',
  controller: 'InstitutionalCodeController'
};

angular
  .module('admin.maintenance')
  .component('institutionalCode', institutionalCode)
  .config(function ($stateProvider) {
    $stateProvider
      .state('institutional-codes', {
        parent: 'app',
        url: '/admin/maintenance/institutional-code',
        component: 'institutionalCode'
      });
  });