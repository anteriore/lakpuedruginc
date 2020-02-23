
function EngineeringItemController($state, ItemsService, _) {
  var ctrl = this;
  ctrl.items = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = '';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addItem = false;
	  ctrl.error = null;
	  loadItems();
  };
  
  function loadItems(){
	  ItemsService.listEngineering().then(function(response){
		  console.log("list response:1 " + JSON.stringify(response.data));
		  ctrl.items = response.data;
	  });
  }
  
  ctrl.showAddItem = function (show){
	  ctrl.addItem = show;
  };
  
  ctrl.editItem = function (id) {
	  ItemsService.get(id).then(function(response){
		  ctrl.item = response.data;
	  });
	  ctrl.addItem = true;
  };
  
  ctrl.saveItem = function (event) {
	    ItemsService.save(event.item).then(function () {
	    	  loadItems();
	    	  ctrl.showAddItem(false);
	    	  ctrl.item = null;
	    });
  };
  
  ctrl.deleteItem = function (id){
	  ItemsService.delete(id).then(function(response){
		  loadItems();
	  });
  };
}

angular
  .module('admin.dashboard')
  .controller('EngineeringItemController', EngineeringItemController);
