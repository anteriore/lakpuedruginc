
function ProcedureAreaController($state, ProcedureAreasService, _) {
  var ctrl = this;
  ctrl.procedureAreas = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addProcedureArea = false;
	  ctrl.error = null;
	  loadProcedureAreas();
  };
  
  function loadProcedureAreas(){
	  ProcedureAreasService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.procedureAreas = response.data;
	  });
  }
  
  ctrl.showAddProcedureArea = function (show){
	  ctrl.addProcedureArea = show;
  };
  
  ctrl.editProcedureArea = function (id) {
	  ProcedureAreasService.get(id).then(function(response){
		  ctrl.procedurearea = response.data;
	  });
	  ctrl.addProcedureArea = true;
  };
  
  ctrl.saveProcedureArea = function (event) {
	    ProcedureAreasService.save(event.procedurearea).then(function () {
	    	  loadProcedureAreas();
	    	  ctrl.showAddProcedureArea(false);
	    	  ctrl.procedurearea = null;
	    });
  };
  
  ctrl.deleteProcedureArea = function (id){
	  ProcedureAreasService.delete(id).then(function(response){
		  loadProcedureAreas();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ProcedureAreaController', ProcedureAreaController);
