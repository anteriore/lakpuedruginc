
function ClientInformationEditController($state, $stateParams, ClientsService, $rootScope) {
  var ctrl = this;
  ctrl.client = {};
  ctrl.$onInit = function () {
    ctrl.error = null;
    
    console.log('clientId: ' + JSON.stringify($stateParams.clientId));
    
    
      
    ClientsService.get($stateParams.clientId).then(function (response) {
      ctrl.client = response.data;
    });
    
 
  };
  ctrl.edit = function (event) {
    console.log('ClientInformationEditController edit');
    var client =  JSON.parse(JSON.stringify(event.client));
  

    ClientsService.update(client).then(function () {
      $state.go('client-informations');
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('ClientInformationEditController', ClientInformationEditController);
