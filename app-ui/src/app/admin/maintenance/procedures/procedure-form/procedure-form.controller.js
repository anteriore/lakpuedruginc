
function ProcedureFormController($state, ProceduresService, ProcedureAreasService) {
  var ctrl = this;
  ctrl.procedureTypes = [];
  ctrl.$onChanges = function (changes) {
    if (changes.procedure) {
      ctrl.procedure = angular.copy(ctrl.procedure);
    }
  };
  
  ctrl.$onInit = function(){
	  ProcedureAreasService.list().then(function(response){
		  ctrl.procedureAreas = response.data;
	  });
  };
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.procedure));
    ctrl.onSubmit({
      $event: {
    	  procedure: ctrl.procedure
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('ProcedureFormController', ProcedureFormController);
