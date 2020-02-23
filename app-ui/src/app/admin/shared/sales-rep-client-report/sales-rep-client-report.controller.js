
function SalesRepClientReportController($state, ClientsService, InventoryService, $stateParams, $rootScope) {
  var ctrl = this;
  
  
  ctrl.$onInit = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  ctrl.salesRepId = $stateParams.salesRepId;
		  ctrl.reportType = "Sales Rep Client Report";
		  ClientsService.getClients(ctrl.company.id, ctrl.salesRepId).then(function(response){
			  console.log(response.data);
			  ctrl.entries = response.data;
		  }).then(() => {
			    setTimeout(function(){
			        window.print();
			        window.close();
			      }, 1500);
			    });;
	 
  };
 
}

angular
  .module('admin.shared')
  .controller('SalesRepClientReportController', SalesRepClientReportController);
