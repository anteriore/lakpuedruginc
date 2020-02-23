
var procedureArea = {
  templateUrl: './procedure-areas.html',
  controller: 'ProcedureAreaController'
};

angular
  .module('admin.maintenance')
  .component('procedureArea', procedureArea)
  .config(function ($stateProvider) {
    $stateProvider
      .state('procedureAreas', {
        parent: 'app',
        url: '/admin/maintenance/procedure-area',
        component: 'procedureArea'
      });
  });