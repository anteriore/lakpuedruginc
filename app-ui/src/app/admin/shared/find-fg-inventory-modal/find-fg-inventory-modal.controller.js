
function FindFgInventoryModalController($state, FinishedGoodsService, ProductInventoryService) {
  var ctrl = this;

	ctrl.sortType = 'mis';
	ctrl.sortReverse = false;
  
  
  
  ctrl.selectFG = function(fg){
	  if(ctrl.fglist.indexOf(fg) !== -1){
		  var index = ctrl.fglist.indexOf(fg);
		  ctrl.fglist.splice(index, 1);
		  console.log("splice "+ index);
	  }else{
		  ctrl.fglist.push(fg);
		  console.log("pushed");
	  }
  };
 
  
  
}

angular
  .module('admin.shared')
  .controller('FindFgInventoryModalController', FindFgInventoryModalController);
