
function EmployeesController($state, EmployeesService, $rootScope, _) {
  var ctrl = this;
  ctrl.employees = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addEmployees = false;
	  ctrl.error = null;
	  loadEmployees();
  };
  
  function loadEmployees(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  EmployeesService.list().then(function(response){
	  	  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.employees = response.data;
	  });
  }
  
  ctrl.openModal = function(employee){
	  ctrl.employee = employee;
	  
  };
  
  ctrl.deleteEmployee = function (id){
	  EmployeesService.delete(id).then(function(response){
		  loadEmployees();
	  });
  };
  
  ctrl.createNewEmployee = function (event) {
	  console.log("new mis");
	    $state.go('employee-new');
  };
}

angular
  .module('admin.dashboard')
  .controller('EmployeesController', EmployeesController);
