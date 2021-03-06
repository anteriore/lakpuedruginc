
function ProcedureController($state, ProceduresService, _) {
  var ctrl = this;
  ctrl.procedures = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = '';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addProcedure = false;
	  ctrl.error = null;
	  loadProcedures();
  };
  
  function loadProcedures(){
	  ProceduresService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.procedures = response.data;
	  });
  }
  
  ctrl.showAddProcedure = function (show){
	  ctrl.addProcedure = show;
  };
  
  ctrl.editProcedure = function (id) {
	  ProceduresService.get(id).then(function(response){
		  ctrl.procedure = response.data;
	  });
	  ctrl.addProcedure = true;
  };
  
  ctrl.saveProcedure = function (event) {
	    ProceduresService.save(event.procedure).then(function () {
	    	  loadProcedures();
	    	  ctrl.showAddProcedure(false);
	    	  ctrl.procedure = null;
	    });
  };
  
  ctrl.deleteProcedure = function (id){
	  ProceduresService.delete(id).then(function(response){
		  loadProcedures();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ProcedureController', ProcedureController);
