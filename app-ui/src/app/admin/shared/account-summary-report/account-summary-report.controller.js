
function PrintAccountSummaryReportController($state, AccountSummaryReportsService, InventoryService, $stateParams, $rootScope) {
  var ctrl = this;
  
  console.log("control number", $stateParams.controlNumber);

  
  ctrl.$onInit = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  ctrl.startDate = new Date($stateParams.startDate.replace(/['"]+/g, ''));
	  ctrl.endDate = new Date($stateParams.endDate.replace(/['"]+/g, ''));
	  //ctrl.dates = ctrl.startDate + " to " + ctrl.endDate;
	  ctrl.dates = ctrl.startDate.getFullYear() + "-" + (ctrl.startDate.getMonth() + 1) + "-" + ctrl.startDate.getDate() + " to "+
			  ctrl.endDate.getFullYear() + "-" + (ctrl.endDate.getMonth() + 1) + "-" + ctrl.endDate.getDate();
	  console.log($stateParams.startDate);
	  if($stateParams.type == "pjv"){
		  ctrl.reportType = "PJV Account Summary Report";
		  console.log(new Date($stateParams.startDate));
		  AccountSummaryReportsService.getPJVAccountSummaryReport(ctrl.company.id, new Date($stateParams.startDate.replace(/['"]+/g, '')), new Date($stateParams.endDate.replace(/['"]+/g, ''))).then(function(response){
			  console.log(response.data);
			  ctrl.entries = response.data;
		  }).then(() => {
			    setTimeout(function(){
			        window.print();
			        window.close();
			      }, 1500);
			    });;
	  } else if ($stateParams.type == "jv"){
		  ctrl.reportType = "JV Account Summary Report";
		  console.log(new Date($stateParams.startDate));
		  AccountSummaryReportsService.getJVAccountSummaryReport(ctrl.company.id, new Date($stateParams.startDate.replace(/['"]+/g, '')), new Date($stateParams.endDate.replace(/['"]+/g, ''))).then(function(response){
			  console.log(response.data);
			  ctrl.entries = response.data;
		  }).then(() => {
			    setTimeout(function(){
			        window.print();
			        window.close();
			      }, 1500);
			    });;
	  } else if($stateParams.type == "vp"){
		  ctrl.reportType = "VP Account Summary Report";
		  console.log(new Date($stateParams.startDate));
		  AccountSummaryReportsService.getVPAccountSummaryReport(ctrl.company.id, new Date($stateParams.startDate.replace(/['"]+/g, '')), new Date($stateParams.endDate.replace(/['"]+/g, ''))).then(function(response){
			  console.log(response.data);
			  ctrl.entries = response.data;
		  }).then(() => {
			    setTimeout(function(){
			        window.print();
			        window.close();
			      }, 1500);
			    });;
	  } else if($stateParams.type == "cdv"){
		  
	  }
	 
  };
 
}

angular
  .module('admin.shared')
  .controller('PrintAccountSummaryReportController', PrintAccountSummaryReportController);
