
function PrintStockCardController($state, StockCardsService, InventoryService, $stateParams, $rootScope) {
  var ctrl = this;
  
  console.log("control number", $stateParams.controlNumber);

  
  ctrl.$onInit = function(){
	  ctrl.company = $rootScope.selectedCompany;
  StockCardsService.listByControlNumberAndCompany($stateParams.controlNumber, ctrl.company.id).then(function(response){
		 ctrl.stockcards = response.data;
		 InventoryService.getItemByControlNumber($stateParams.controlNumber).then(function(response){
			 ctrl.item = response.data;
			 console.log("item " + ctrl.item);
		 });
	  }).then(() => {
		    setTimeout(function(){
		        window.print();
		        window.close();
		      }, 1500);
		    });
  };
 
}

angular
  .module('admin.shared')
  .controller('PrintStockCardController', PrintStockCardController);
