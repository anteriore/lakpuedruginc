
function PurchaseRequestEditController($state, $stateParams, PurchaseRequestsService, InventoryService, PurchaseOrdersService, ReceivingReceiptsService, CompanyService, $rootScope, PermissionsService) {
  var ctrl = this;
  ctrl.$onInit = function () {
    ctrl.error = null;
    
    PurchaseRequestsService.get($stateParams.prfId).then(function(response){
    	ctrl.prf = response.data;
    	ctrl.prf.date = new Date();
    	ctrl.prf.dateNeeded = new Date();
    	console.log("requested items:" + JSON.stringify(ctrl.prf.requestedItems));
    	//ctrl.itemlist = ctrl.prf.requestedItems;
    	//console.log("item list:" + JSON.stringify(ctrl.itemlist));
    	    for (var i = 0; i < ctrl.prf.requestedItems.length; i++) {
    	    	(function(i){
    	    		  var requestedItem = ctrl.prf.requestedItems[i];
    	    		  InventoryService.getStockQuantityOfItem(requestedItem.item.id, ctrl.prf.company.id).then(function(response){
    	    	    	  ctrl.prf.requestedItems[i].stockOnHand = response.data;
    	    	    	  console.log("prf stock" + ctrl.prf.requestedItems[i].stockOnHand);
    	    		  });
    	    	      PurchaseRequestsService.getPrfQuantityOfItem(requestedItem.item.id, ctrl.prf.company.id).then(function(response){
    	    	    	  ctrl.prf.requestedItems[i].pendingPrf = response.data;
    	    	      });
    	    	      PurchaseOrdersService.getPurchaseOrderQuantity(requestedItem.item.id, ctrl.prf.company.id).then(function(response){
    	    	    	  ctrl.prf.requestedItems[i].pendingPo = response.data;
    	    	      });
    	    	      ReceivingReceiptsService.getQuarantinedQuantityOfItem(requestedItem.item.id, ctrl.prf.company.id).then(function(response){
    	    	    	  ctrl.prf.requestedItems[i].pendingRr = response.data;
    	    	      });
    	    	})(i);
    	      
    	    }
    	   
    	    
    });
    
  };
  ctrl.editPurchaseRequest = function (event) {
    console.log('PurchaseRequestEditController editPurchaseRequest');

    PurchaseRequestsService.update(event.prf).then(function () {
      $state.go('purchase-requests');
    });
  };
}

angular
  .module('admin.dashboard')
  .controller('PurchaseRequestEditController', PurchaseRequestEditController);
