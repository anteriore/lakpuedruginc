
function MaterialReceivingFormController($state, MaterialReceivingsService, MaterialIssuancesService, _) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  ctrl.name = ctrl.user.firstName + ' ' + ctrl.user.lastName;
	  ctrl.company = JSON.parse(window.localStorage.getItem('company'));
	  ctrl.mrs = {receivedBy:ctrl.user,
			  date:new Date(),
			  company:ctrl.company};
		loadMaterialIssuance();

  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.mrs) {
      ctrl.mrs = angular.copy(ctrl.mrs);
    }
  };
  
		ctrl.sortType = 'mis';
		ctrl.sortReverse = false;
	  
	  
	  function loadMaterialIssuance(){
		  ctrl.company = JSON.parse(window.localStorage.getItem('company'));
		  MaterialIssuancesService.listByStatus("Pending").then(function(response){
			  ctrl.misList = response.data;
			  console.log("response" + JSON.stringify(ctrl.misList));
		  });
		  ctrl.company = JSON.parse(window.localStorage.getItem('company'));
		  InventoryService.listByCompany(ctrl.company.id).then(function(response){
			  ctrl.inventoryList = response.data;
			  console.log("response" + JSON.stringify(ctrl.inventoryList));
		  });
	  }
	  
	  ctrl.selectMIS = function(mis){
		  ctrl.mrs.mis = mis;
	  };
  
  ctrl.submitForm = function () {	   
    console.log('submitForm: ' + JSON.stringify(ctrl.mrs));
    ctrl.onSubmit({
      $event: {
    	  mrs: ctrl.mrs
      }
    });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('MaterialReceivingFormController', MaterialReceivingFormController);
