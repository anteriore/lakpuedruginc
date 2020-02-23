
function MaterialIssuanceNewController($state, MaterialIssuancesService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.mis = {
    		company: $rootScope.selectedCompany
    };
  };

  ctrl.createMIS = function (event) {
    MaterialIssuancesService.save(event.mis).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
        $state.go('materialissuance');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('MaterialIssuanceNewController', MaterialIssuanceNewController);
