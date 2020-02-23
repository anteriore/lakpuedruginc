
function InventoryMovementsController($state, InventoryMovementsService, $rootScope, _) {
  var ctrl = this;
  ctrl.inventoryMovementList = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addInventoryMovements = false;
	  ctrl.error = null;
	  loadInventoryMovements();
  };
  
  function loadInventoryMovements(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  InventoryMovementsService.listByCompany(ctrl.company.id).then(function(response){
		  ctrl.inventoryMovementList = response.data;
	  });
  }
  
  ctrl.openModal = function(inventoryMovement){
	  ctrl.mris = inventoryMovement;
  };
  
  ctrl.createNewMRIS = function (event) {
	  console.log("new mis");
	    $state.go('inventory-movement-new');
  };
}

angular
  .module('admin.dashboard')
  .controller('InventoryMovementsController', InventoryMovementsController);
