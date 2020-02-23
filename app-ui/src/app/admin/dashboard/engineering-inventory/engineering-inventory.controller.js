
function EngineeringInventoryController($state, EngineeringInventoryService, StockCardsService, $rootScope, _) {
  var ctrl = this;
  ctrl.inventoryList = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addEngineeringInventory = false;
	  ctrl.error = null;
	  loadEngineeringInventory();
  };
  
  function loadEngineeringInventory(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  EngineeringInventoryService.listByCompany(ctrl.company.id).then(function(response){
		  ctrl.inventoryList = response.data;
		  console.log(ctrl.inventoryList);	
	  });
  }
  
  ctrl.openStockCard = function(inventory){
	  ctrl.controlNumber = inventory.item.code;
	  ctrl.company = $rootScope.selectedCompany;
	  StockCardsService.listByControlNumberAndCompany(inventory.item.code, ctrl.company.id).then(function(response){
			 ctrl.stockCards = response.data;
			 console.log("response data size " + ctrl.stockCards.length);
		  });
	  $("#stockCardModal").modal("show");
  }
}

angular
  .module('admin.dashboard')
  .controller('EngineeringInventoryController', EngineeringInventoryController);
