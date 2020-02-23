
function ClassificationController($state, ClassificationsService, $rootScope, _) {
  var ctrl = this;
  ctrl.classifications = [];
  ctrl.companies = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';

  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addClassification = false;
	  ctrl.error = null;
	  loadClassifications();
  };
  
  function loadClassifications(){
	  ClassificationsService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.classifications = response.data;
	  });
  }
  
  ctrl.showAddClassification = function (show){
	  ctrl.addClassification = show;
  };
  
  ctrl.editClassification = function (id) {
	  ClassificationsService.get(id).then(function(response){
		  ctrl.classification = response.data;
	  });
	  ctrl.addClassification = true;
  };
  
  ctrl.saveClassification = function (event) {
	    ClassificationsService.save(event.classification).then(function () {
	    	  loadClassifications();
	    	  ctrl.showAddClassification(false);
	    });
  };
  
  ctrl.deleteClassification = function (id){
	  ClassificationsService.delete(id).then(function(response){
		  loadClassifications();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ClassificationController', ClassificationController);
