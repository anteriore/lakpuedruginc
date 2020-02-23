
function PrintJvReportController($state, JournalVouchersService, InventoryService, $stateParams, $rootScope) {
  var ctrl = this;
  
  
  ctrl.$onInit = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  ctrl.startDate = new Date($stateParams.startDate.replace(/['"]+/g, ''));
	  ctrl.endDate = new Date($stateParams.endDate.replace(/['"]+/g, ''));
	  //ctrl.dates = ctrl.startDate + " to " + ctrl.endDate;
	  ctrl.dates = ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
			  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate();
	  console.log($stateParams.startDate);
		  ctrl.reportType = "Journal Voucher Report";
		  console.log(new Date($stateParams.startDate));
		  JournalVouchersService.getByCompanyAndDates(ctrl.company.id, new Date($stateParams.startDate.replace(/['"]+/g, '')), new Date($stateParams.endDate.replace(/['"]+/g, ''))).then(function(response){
			  console.log(response.data);
			  ctrl.entries = response.data;
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
  .controller('PrintJvReportController', PrintJvReportController);
