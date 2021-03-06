
var departmentAndArea = {
  bindings: {
    departments: '<',
    areas: '<'
  },
  templateUrl: './departments-and-areas.html',
  controller: 'DepartmentsAndAreasController'
};

angular
  .module('admin.maintenance')
  .component('departmentAndArea', departmentAndArea)
  .config(function ($stateProvider) {
    $stateProvider
      .state('department-and-area', {
        parent: 'app',
        url: '/admin/maintenance/department-and-area',
        component: 'departmentAndArea'
      });
  });