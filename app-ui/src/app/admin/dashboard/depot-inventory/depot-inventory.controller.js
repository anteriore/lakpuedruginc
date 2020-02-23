
function DepotInventoryController($state, ProductInventoryService, ReportsService, DepotsService, UsersService, StockCardsService, $rootScope, ProductStockCardService,_) {
  var ctrl = this;
  ctrl.depotInventoryList = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addDepotInventory = false;
	  ctrl.error = null;
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
  };
  
  ctrl.selectDepot = function(){
	  loadDepotInventory();
  };
  
  ctrl.exportReport = function (){
	  DepotsService.get(ctrl.userAssignedDepot.id).then(function (response){
		  var reportTitle = {title: 'Report : Finished Good Summary Report'};
		  var dates = {dates: 'Depot : ' + response.data.name}
		  var headers = {
				    code: 'Code'.replace(/,/g, ''), // remove commas to avoid errors
				    fg: "Finished Good",
				    unit: "Small/Big",
				    quantity: "Quantity"
		  };
		  
		  ProductInventoryService.listProductInventoryDepotReport(ctrl.company.id, ctrl.userAssignedDepot.id).then(function(response){
			  console.log(response.data);
			  ReportsService.exportCSVFile(headers, reportTitle, dates, response.data, "print");
		  });  
	  });
  };
  
  function loadDepotInventory(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  console.log("asd" + ctrl.userAssignedDepot);
	  ProductInventoryService.listProductInventoryDepotView(ctrl.company.id, ctrl.userAssignedDepot.id).then(function(response){
		  ctrl.depotInventoryList = response.data;
		  console.log("LIST" + JSON.stringify(ctrl.depotInventoryList));
	  });
  }
  
  ctrl.openModal = function(depotInventory){
	  console.log(JSON.stringify(depotInventory));
	  ctrl.finishedGood = depotInventory['product'].finishedGood;
	  ProductInventoryService.listByCompanyAndFinishedGood(ctrl.company.id, ctrl.finishedGood.id).then(function(response){
		  ctrl.productList = response.data;
	  });
	  
  };
  
  ctrl.openStockCard = function(depotInventory){
	  ProductStockCardService.listByCompanyAndProduct(ctrl.company.id, depotInventory.product.id).then(function(response){
			 ctrl.stockCards = response.data;
			 console.log("response data size " + ctrl.stockCards.length);
		  });
  }
}

angular
  .module('admin.dashboard')
  .controller('DepotInventoryController', DepotInventoryController);
