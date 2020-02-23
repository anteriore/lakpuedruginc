
function ProductIssuanceFormController($state, ProductIssuancesService, ApprovedItemsService, ProductInventoryService, DepotsService, UsersService, _) {
  var ctrl = this;
  ctrl.issuedList = [];
  ctrl.$onInit = function () {
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  ctrl.pis.requestedBy = ctrl.user;
	  ctrl.name = ctrl.user.firstName + ' ' + ctrl.user.lastName;
	  ctrl.pis.inventoryList = [];
	  ctrl.stockOnHandList = [];
	  ctrl.pis.date = new Date();
	  
	  DepotsService.list().then(function (response){
		  ctrl.depots = response.data;
		  console.log(ctrl.depots);
	  });
	  
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
	  
	  ctrl.company = JSON.parse(window.localStorage.getItem('company'));
	  
	  
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.pis) {
      ctrl.pis = angular.copy(ctrl.pis);
    }
  };
  
  ctrl.selectFromInventory = function () {
	  ProductInventoryService.listByDepot(ctrl.pis.fromDepot.id).then(function(response){
		  ctrl.inventoryList = response.data;
		  console.log("response" + JSON.stringify(ctrl.inventoryList));
	  });  
	  $("#findInventoryModal").modal("show");
  };
  
  ctrl.submitForm = function () {	   
    console.log('submitForm: ' + JSON.stringify(ctrl.pis));
    
    ctrl.onSubmit({
      $event: {
    	  pis: ctrl.pis
      }
    });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('ProductIssuanceFormController', ProductIssuanceFormController);
