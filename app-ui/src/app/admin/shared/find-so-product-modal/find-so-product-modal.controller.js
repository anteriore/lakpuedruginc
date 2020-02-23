
function FindSoProductModalController($state, SalesOrdersService, $rootScope) {
  var ctrl = this;
  
  ctrl.selectSoProduct = function(inventory){
	  if(ctrl.isProductPresent(inventory) !== -1){
		  var index = ctrl.isProductPresent(inventory);
		  ctrl.products.splice(index, 1);
	  }else{
		  ctrl.products.push({
			  product: inventory.product,
			  quantity: inventory.quantity,
			  unitPrice: 0,
			  salesOrderProductId: inventory.id
			  });
	  }
	  
  };
  
  ctrl.isProductPresent = function(inventory){
	  for(var i = 0; i < ctrl.products.length; i++){
		  if(ctrl.products[i].product.id == inventory.product.id){
			  return i;
		  }
	  }
	  return -1;
  }
}

angular
  .module('admin.shared')
  .controller('FindSoProductModalController', FindSoProductModalController);
