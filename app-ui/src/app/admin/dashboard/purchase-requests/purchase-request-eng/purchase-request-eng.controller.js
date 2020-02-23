
function PurchaseRequestEngController($state, $stateParams, PurchaseRequestsService, DepartmentsService, PurchaseOrdersService, ReceivingReceiptsService, CompanyService, $rootScope, PermissionsService) {
  var ctrl = this;
  ctrl.prf  = {};
  ctrl.$onInit = function () {
    ctrl.error = null;
    
    ctrl.prf.date = new Date();
	ctrl.prf.dateNeeded = new Date();
	ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	DepartmentsService.getByName("Engineering").then(function(response){
		ctrl.prf = {
				date: new Date(),
				dateNeeded: new Date(),
		   		requestedBy : ctrl.user,
		        company: ctrl.user.company,
		        department: response.data
		    };  
	});
	
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
  .controller('PurchaseRequestEngController', PurchaseRequestEngController);
