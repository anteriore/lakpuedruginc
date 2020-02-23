
function MaterialReevaluationNewController($state, MaterialReevaluationsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.mr = {
    		company: $rootScope.selectedCompany,
    };
  };

  ctrl.createMaterialReevaluation = function (event) {
    MaterialReevaluationsService.save(event.mr).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
        $state.go('material-reevaluations');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('MaterialReevaluationNewController', MaterialReevaluationNewController);
