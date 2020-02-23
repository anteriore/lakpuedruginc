
function ClientInformationNewController($state, ClientsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.client = {
        company: $rootScope.selectedCompany,
        clientReferencesList: []
    };
  };

  ctrl.createClient = function (event) {
    ClientsService.save(event.client).then(function (response) {
    	  console.log("createClient " + JSON.stringify(response.data));
        $state.go('client-informations');
    });

  };
}

angular
  .module('admin.maintenance')
  .controller('ClientInformationNewController', ClientInformationNewController);
