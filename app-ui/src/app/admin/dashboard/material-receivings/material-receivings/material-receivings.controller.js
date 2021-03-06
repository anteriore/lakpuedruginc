
function MaterialReceivingsController($state, MaterialReceivingsService, $rootScope, _) {
  var ctrl = this;
  ctrl.materialReceivingSlips = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addMaterialReceivings = false;
	  ctrl.error = null;
	  loadMaterialReceivings();
  };
  
  function loadMaterialReceivings(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  MaterialReceivingsService.listByCompany(ctrl.company.id).then(function(response){
	  	  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.materialReceivingSlips = response.data;
	  });
  }
  
  ctrl.openModal = function(inventory){
	  ctrl.mrs = inventory;
	  
  };
  
  ctrl.createNewMRS = function (event) {
	  console.log("new mis");
	    $state.go('material-receiving-new');
  };
}

angular
  .module('admin.dashboard')
  .controller('MaterialReceivingsController', MaterialReceivingsController);
