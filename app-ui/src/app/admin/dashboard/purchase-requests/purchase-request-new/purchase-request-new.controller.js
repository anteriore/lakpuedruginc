
function PurchaseRequestNewController($state, $stateParams, PurchaseRequestsService, CompanyService, DepartmentsService, PermissionsService) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    DepartmentsService.get(1).then(function(response){ctrl.prf = {
      requestedBy : ctrl.user,
      company: ctrl.user.company,
      department: response.data
  };});
    
  };

  ctrl.createPurchaseRequest = function (event) {
	console.log("create " + JSON.stringify(event.prf));
    PurchaseRequestsService.save(event.prf).then(function () {
      $state.go('purchase-requests');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('PurchaseRequestNewController', PurchaseRequestNewController);
