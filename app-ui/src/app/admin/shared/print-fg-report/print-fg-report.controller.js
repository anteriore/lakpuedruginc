
function PrintFgReportController($state, ProductInventoryService, DepotsService, $stateParams, $rootScope) {
  var ctrl = this;
  
  
  ctrl.$onInit = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  //ctrl.dates = ctrl.startDate + " to " + ctrl.endDate;
	  DepotsService.get($stateParams.depotId).then(function(response){
		  ctrl.reportType = "Finished Goods Summary Report";
		  ctrl.dates = response.data.name;
		  ProductInventoryService.listProductInventoryDepotReport(ctrl.company.id, response.data.id).then(function(response){
			  console.log(response.data);
			  ctrl.entries = response.data;
		  }).then(() => {
			    setTimeout(function(){
			        window.print();
			        window.close();
			      }, 1500);
			    });
	 
	  });
	  
	  
  };
 
}

angular
  .module('admin.shared')
  .controller('PrintFgReportController', PrintFgReportController);
