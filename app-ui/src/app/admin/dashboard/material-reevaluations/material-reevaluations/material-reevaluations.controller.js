
function MaterialReevaluationController($state, MaterialReevaluationsService, $rootScope, _) {
  var ctrl = this;
  ctrl.materialReevaluations = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addMaterialReevaluation = false;
	  ctrl.error = null;
	  loadMaterialReevaluations();
  };
  
  function loadMaterialReevaluations(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  MaterialReevaluationsService.listByCompany(ctrl.company.id).then(function(response){
	  	  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.materialReevaluations = response.data;
	  });
  }
  ctrl.createNewMaterialReevaluation = function (event) {
	    console.log('createNewMaterialReevaluation');
	    $state.go('material-reevaluation-new');
  };
  
  ctrl.openModal = function(materialReevaluation){
	  console.log("show modal" +  ctrl.showModal);
	  console.log("materialReevaluation" + JSON.stringify(materialReevaluation));
	  ctrl.materialReevaluation = materialReevaluation;
	  
  };
  
  ctrl.editMaterialReevaluation = function (id) {
	  $state.go('material-reevaluation-edit', { 'materialReevaluationId': id });
  };
  /*
  ctrl.showAddMaterialReevaluation = function (show){
	  ctrl.addMaterialReevaluation = show;
  };
  
  
  
  ctrl.saveMaterialReevaluation = function (event) {
	    MaterialReevaluationsService.save(event.purchaserequest).then(function () {
	    	  loadMaterialReevaluations();
	    	  ctrl.showAddMaterialReevaluation(false);
	    	  ctrl.purchaserequest = null;
	    });
  };
  */
  
  ctrl.deleteMaterialReevaluation = function (id){
	  MaterialReevaluationsService.delete(id).then(function(response){
		  loadMaterialReevaluations();
	  });
  };
}

angular
  .module('admin.dashboard')
  .controller('MaterialReevaluationController', MaterialReevaluationController);
