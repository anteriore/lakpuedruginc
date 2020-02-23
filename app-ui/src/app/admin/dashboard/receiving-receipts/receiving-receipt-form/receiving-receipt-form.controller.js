
function ReceivingReceiptFormController($state, ReceivingReceiptsService) {
  var ctrl = this;
  
  ctrl.$onInit = function (){
	ctrl.rr.receivedItems = [];  
	ctrl.receivedItemsView = [];
  };
  
  ctrl.$onChanges = function (changes) {
    if (changes.rr) {
      ctrl.rr = angular.copy(ctrl.rr);
    }
  };

  ctrl.loadReceivedItems = function (receivedItem, index){
	  receivedItem.item = ctrl.rr.purchaseOrder.purchaseRequests[index].item;
	  receivedItem.unit = ctrl.rr.purchaseOrder.purchaseRequests[index].packSize;
	  
  };
  
  ctrl.submitForm = function () {
  	console.log("RECEIVED ITEMS" + JSON.stringify(ctrl.rr.receivedItems));
    console.log('submitForm: ' + JSON.stringify(ctrl.rr));
    ctrl.onSubmit({
      $event: {
    	  rr: ctrl.rr
      }
    });
  };
  
}

angular
  .module('admin.dashboard')
  .controller('ReceivingReceiptFormController', ReceivingReceiptFormController);
