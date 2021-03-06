
function MaterialIssuanceFormController($state, MaterialIssuancesService, ApprovedItemsService, InventoryService, $rootScope, _) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  ctrl.mis.requestedBy = ctrl.user;
	  ctrl.name = ctrl.user.firstName + ' ' + ctrl.user.lastName;
	  ctrl.mis.inventoryList = [];
	  ctrl.stockOnHandList = [];
	  ctrl.mis.date = new Date();
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.mis) {
      ctrl.mis = angular.copy(ctrl.mis);
    }
  };

  ctrl.selectFromInventory = function(){
	  $("#findInventoryModal").modal('show');
  };
  
  ctrl.submitForm = function () {	   
    console.log('submitForm: ' + JSON.stringify(ctrl.mis));
    ctrl.onSubmit({
      $event: {
    	  mis: ctrl.mis
      }
    });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('MaterialIssuanceFormController', MaterialIssuanceFormController);
