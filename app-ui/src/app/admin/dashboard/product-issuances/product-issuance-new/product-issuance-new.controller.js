
function ProductIssuanceNewController($state, ProductIssuancesService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.pis = {
    		company: $rootScope.selectedCompany
    };
  };

  ctrl.createPIS = function (event) {
		  ProductIssuancesService.save(event.pis).then(function (response) {
	    	  console.log("create " + JSON.stringify(response.data));
	        $state.go('productissuance');
		  });
  };
}

angular
  .module('admin.dashboard')
  .controller('ProductIssuanceNewController', ProductIssuanceNewController);
