var employeeNew = {
  templateUrl: './employee-new.html',
  controller: 'EmployeeNewController'
};

angular
  .module('admin.dashboard')
  .component('employeeNew', employeeNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('employee-new', {
        parent: 'app',
        url: '/admin/dashboard/employee/new',
        component: 'employeeNew'
      });
  });
