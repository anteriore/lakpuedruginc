
function PurchaseRequestFormController($state, PurchaseRequestsService, ItemsService, InventoryService, PurchaseOrdersService, ReceivingReceiptsService) {
  var ctrl = this;
  ctrl.stockOnHand = [];
  ctrl.pendingPrf = [];
  ctrl.pendingPo = [];
  ctrl.pendingRr = [];
  
  ctrl.$onChanges = function (changes) {
    if (changes.prf) {
      ctrl.prf = angular.copy(ctrl.prf);
    }
  };
  
  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.prf));
    
    ctrl.onSubmit({
      $event: {
    	  prf: ctrl.prf
      }
    });
  };

  ctrl.selectItem = function(){
	  ctrl.itemlist = [];
	  for(var i = 0; ctrl.prf.requestedItems != null && 	i < ctrl.prf.requestedItems.length; i++){
		  ctrl.itemlist.push({
			  item:ctrl.prf.requestedItems[i].item,
			  stockOnHand:ctrl.prf.requestedItems[i].stockOnHand,
			  pendingPrf:ctrl.prf.requestedItems[i].pendingPrf,
			  pendingPo:ctrl.prf.requestedItems[i].pendingPo,
		  	  pendingRr:ctrl.prf.requestedItems[i].pendingRr
			  });
	  }
	  
  };
  
  ctrl.selectedItems = function() {
	console.log("itemlist" + JSON.stringify(ctrl.itemlist));
    ctrl.prf.requestedItems = ctrl.itemlist.map(i => {
      var item = null;
        item = i.item;

      
      return {
        item: item
      }
    
    });

    ctrl.loadItemDetails();

    console.log('selectedItems {}', ctrl.prf.requestedItems );
  }

  ctrl.loadItemDetails = function() {
	
    for (var i = 0; i < ctrl.prf.requestedItems.length; i++) {
    	(function(i){
    		  var requestedItem = ctrl.prf.requestedItems[i];
    		  InventoryService.getStockQuantityOfItem(requestedItem.item.id, ctrl.prf.company.id).then(function(response){
    	    	  ctrl.prf.requestedItems[i].stockOnHand = response.data;
    	    	  console.log("stock" + ctrl.prf.requestedItems[i].stockOnHand);
    	      });
    	      PurchaseRequestsService.getPrfQuantityOfItem(requestedItem.item.id, ctrl.prf.company.id).then(function(response){
    	    	  ctrl.prf.requestedItems[i].pendingPrf = response.data;
    	    	  console.log("pending" + ctrl.prf.requestedItems[i].pendingPrf);
    	      });
    	      PurchaseOrdersService.getPurchaseOrderQuantity(requestedItem.item.id, ctrl.prf.company.id).then(function(response){
    	    	  ctrl.prf.requestedItems[i].pendingPo = response.data;
    	      });
    	      ReceivingReceiptsService.getQuarantinedQuantityOfItem(requestedItem.item.id, ctrl.prf.company.id).then(function(response){
    	    	  ctrl.prf.requestedItems[i].pendingRr = response.data;
    	      });
    	})(i);
    	
    }
    
  }

  
  ctrl.computeTotalQuantity = function(item, quantity, index){
	  if(ctrl.prf.requestedItems[index].moqQuantity == null || ctrl.prf.requestedItems[index].moqQuantity == ''){
		  ctrl.prf.requestedItems[index].moqQuantity = 1;
	  }
	  
	  if(quantity < ctrl.prf.requestedItems[index].pendingPo + ctrl.prf.requestedItems[index].stockOnHand + ctrl.prf.requestedItems[index].pendingPrf + ctrl.prf.requestedItems[index].pendingRr){
		  ctrl.prf.requestedItems[index].quantityLacking = 0;
		  ctrl.prf.requestedItems[index].quantityRequested = 0;
	  }else{
		  ctrl.prf.requestedItems[index].quantityLacking = quantity - ctrl.prf.requestedItems[index].stockOnHand - ctrl.prf.requestedItems[index].pendingPrf - ctrl.prf.requestedItems[index].pendingPo - ctrl.prf.requestedItems[index].pendingRr;
		  ctrl.prf.requestedItems[index].quantityRequested = ctrl.prf.requestedItems[index].quantityLacking;
	  }

	  if(ctrl.prf.requestedItems[index].quantityRequested % ctrl.prf.requestedItems[index].moqQuantity !== 0){
		  ctrl.prf.requestedItems[index].quantityRequested = ctrl.prf.requestedItems[index].moqQuantity - (ctrl.prf.requestedItems[index].quantityRequested % ctrl.prf.requestedItems[index].moqQuantity) + parseInt(ctrl.prf.requestedItems[index].quantityRequested); 
	  }
	  
};
  
}

angular
  .module('admin.dashboard')
  .controller('PurchaseRequestFormController', PurchaseRequestFormController);
