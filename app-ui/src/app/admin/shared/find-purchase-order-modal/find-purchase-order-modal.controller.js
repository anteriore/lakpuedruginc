
function FindPurchaseOrderModalController($state, ReceivingReceiptsService, PurchaseOrdersService, $rootScope) {
  var ctrl = this;
  ctrl.purchaseOrders = [];
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function(){
	loadPurchaseOrders();
	ctrl.receiveditemsview = [];
	ctrl.receiveditems = [];
  };
  
  
  function loadPurchaseOrders(){
	  ctrl.company = $rootScope.selectedCompany;
	  PurchaseOrdersService.listNotCompletedByCompany(ctrl.company.id).then(function(response){
		  ctrl.purchaseOrders = response.data;
		  console.log("response" + JSON.stringify(ctrl.purchaseOrders));
	  });
  }
  
  
  ctrl.getPurchaseOrder = function(po){
	ctrl.po = po;  
	ctrl.receiveditems = [];
	ctrl.receiveditemsview = [];
	for(var i = 0; i < po.orderedItems.length; i++){
		(function(i){
		if(po.orderedItems[i].status != "Completed"){
			ctrl.receiveditems.push({
			quantity:0,
			item:po.orderedItems[i].item,
			unit:po.orderedItems[i].unit
			});
			
			ReceivingReceiptsService.getQuarantinedQuantityOfItem(po.orderedItems[i].item.id, ctrl.company.id).then(function(response){
				ctrl.receiveditemsview.push({
					prfNumber:po.orderedItems[i].prfNumber,
					item:po.orderedItems[i].item,
					quantityOrdered:po.orderedItems[i].quantity,
					pendingRr: response.data
					});
		    });
			
		}
	  })(i);
	}
	
	
  };
}

angular
  .module('admin.shared')
  .controller('FindPurchaseOrderModalController', FindPurchaseOrderModalController);
