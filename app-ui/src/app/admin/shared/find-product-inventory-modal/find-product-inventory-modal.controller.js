
function FindProductInventoryModalController($state, InventoryService, $rootScope) {
  var ctrl = this;
  ctrl.issuedlist = [];
  
	ctrl.sortType = 'controlNumber';
	ctrl.sortReverse = false;
  
  ctrl.selectInventory = function(inventory){
	  if(ctrl.issuedlist.indexOf(inventory) !== -1){
		  var index = ctrl.issuedlist.indexOf(inventory);
		  ctrl.issuedlist.splice(index, 1);
		  ctrl.issuedinventorylist.splice(index, 1);
		  ctrl.stockonhand.splice(index, 1);
	  }else{
		  ctrl.issuedlist.push(inventory);
		  ctrl.issuedinventorylist.push(
				  {
					  product: inventory.product,
					  quantity:0
				  }
		  );
		  ctrl.stockonhand.push(inventory.quantity);
		  console.log(ctrl.stockonhand);
	  }
	  
  };
}

angular
  .module('admin.shared')
  .controller('FindProductInventoryModalController', FindProductInventoryModalController);
