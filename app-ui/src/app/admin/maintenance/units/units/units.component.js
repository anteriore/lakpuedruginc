
var unit = {
  templateUrl: './units.html',
  controller: 'UnitController'
};

angular
  .module('admin.maintenance')
  .component('unit', unit)
  .config(function ($stateProvider) {
    $stateProvider
      .state('units', {
        parent: 'app',
        url: '/admin/maintenance/unit',
        component: 'unit'
      });
  });