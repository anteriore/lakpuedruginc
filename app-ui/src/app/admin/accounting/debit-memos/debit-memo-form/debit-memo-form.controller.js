
function DebitMemoFormController($state, DebitMemosService, MemoTypesService, UsersService, SalesSlipsService) {
  var ctrl = this;
  
  ctrl.$onChanges = function (changes) {
    if (changes.dm) {
      ctrl.dm = angular.copy(ctrl.dm);
    }
  };
  
  ctrl.$onInit = function(){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));

	  MemoTypesService.listByType("DM").then(function(response){
		  ctrl.memoTypes = response.data;
	  });
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.depots = response.data.depots;
	  });
	  
	  ctrl.dm.memoSlipType = "DM";
  };
  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.dm));
    
    ctrl.onSubmit({
      $event: {
    	  dm: ctrl.dm
      }
    });
  };
  
  ctrl.loadSalesSlips = function() {
	  console.log("asd");
	  SalesSlipsService.listByDepotAndStatus(ctrl.dm.depot.id, ["Pending","Incomplete"]).then(function(response){
		  ctrl.salesSlips = response.data;
		  console.log("hello" + JSON.stringify(ctrl.salesSlips));
		  $("#findSalesSlipModal").modal("show");
	  });
  };
  



  
}

angular
  .module('admin.accounting')
  .controller('DebitMemoFormController', DebitMemoFormController);
