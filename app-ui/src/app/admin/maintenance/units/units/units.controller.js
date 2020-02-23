
function UnitController($state, UnitsService, $rootScope, _) {
  var ctrl = this;
  ctrl.units = [];
  ctrl.companies = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';

  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addUnit = false;
	  ctrl.error = null;
	  loadUnits();
  };
  
  function loadUnits(){
	  UnitsService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.units = response.data;
	  });
  }
  
  ctrl.showAddUnit = function (show){
	  ctrl.addUnit = show;
  };
  
  ctrl.editUnit = function (id) {
	  UnitsService.get(id).then(function(response){
		  ctrl.unit = response.data;
	  });
	  ctrl.addUnit = true;
  };
  
  ctrl.saveUnit = function (event) {
	    UnitsService.save(event.unit).then(function () {
	    	  loadUnits();
	    	  ctrl.showAddUnit(false);
	    });
  };
  
  ctrl.deleteUnit = function (id){
	  UnitsService.delete(id).then(function(response){
		  loadUnits();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('UnitController', UnitController);
