
function EmployeeNewController($state, EmployeesService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
  };

  ctrl.createEmployee = function (event) {
    EmployeesService.save(event.employee).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
        $state.go('employee');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('EmployeeNewController', EmployeeNewController);
