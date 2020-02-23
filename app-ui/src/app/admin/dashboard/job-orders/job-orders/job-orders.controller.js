
function JobOrdersController($state, JobOrdersService, $rootScope, _) {
  var ctrl = this;
  ctrl.jobOrderSlips = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addJobOrders = false;
	  ctrl.error = null;
	  loadJobOrders();
  };
  
  function loadJobOrders(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  JobOrdersService.list().then(function(response){
	  	  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.jobOrderSlips = response.data;
	  });
  }
  
  ctrl.openModal = function(inventory){
	  ctrl.jo = inventory;
	  
  };
  
  ctrl.createNewJO = function (event) {
	  console.log("new jo");
	    $state.go('job-order-new');
  };
}

angular
  .module('admin.dashboard')
  .controller('JobOrdersController', JobOrdersController);
