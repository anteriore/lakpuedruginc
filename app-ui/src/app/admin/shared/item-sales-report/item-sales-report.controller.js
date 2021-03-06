
function ItemSalesReportController($state, SalesReportsService, $stateParams, $rootScope) {
  var ctrl = this;
  
  
  ctrl.$onInit = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  ctrl.startDate = new Date($stateParams.startDate.replace(/['"]+/g, ''));
	  ctrl.endDate = new Date($stateParams.endDate.replace(/['"]+/g, ''));
	  //ctrl.dates = ctrl.startDate + " to " + ctrl.endDate;
	  ctrl.dates = ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
			  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate();
	  console.log($stateParams.startDate);
		  ctrl.reportType = "Item Sales Report (Item)";
		  console.log(new Date($stateParams.startDate));
		  SalesReportsService.itemSalesReport(ctrl.depot.id, new Date($stateParams.startDate.replace(/['"]+/g, '')), new Date($stateParams.endDate.replace(/['"]+/g, '')), $stateParams.itemId).then(function(response){
			  console.log(response.data);
			  ctrl.entries = response.data;
		  }).then(() => {
			    setTimeout(function(){
			        window.print();
			        window.close();
			      }, 1500);
			    });
	 
  };
  
  ctrl.months = ["Jan", "Feb", "Mar", "Apr", "Jun" , "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
 
  ctrl.range = function(min, max, step) {
	    step = step || 1;
	    var input = [];
	    for (var i = min; i <= max; i += step) {
	        input.push(i);
	    }
	    return input;
	};
}

angular
  .module('admin.shared')
  .controller('ItemSalesReportController', ItemSalesReportController);
