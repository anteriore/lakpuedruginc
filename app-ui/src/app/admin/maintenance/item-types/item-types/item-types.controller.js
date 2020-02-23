
function ItemTypeController($state, ItemTypesService, _) {
  var ctrl = this;
  ctrl.itemTypes = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addItemType = false;
	  ctrl.error = null;
	  loadItemTypes();
  };
  
  function loadItemTypes(){
	  ItemTypesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.itemTypes = response.data;
	  });
  }
  
  ctrl.showAddItemType = function (show){
	  ctrl.addItemType = show;
  };
  
  ctrl.editItemType = function (id) {
	  ItemTypesService.get(id).then(function(response){
		  ctrl.itemType = response.data;
	  });
	  ctrl.addItemType = true;
  };
  
  ctrl.saveItemType = function (event) {
	    ItemTypesService.save(event.itemtype).then(function () {
	    	  loadItemTypes();
	    	  ctrl.showAddItemType(false);
	    	  ctrl.itemtype = null;
	    });
  };
  
  ctrl.deleteItemType = function (id){
	  ItemTypesService.delete(id).then(function(response){
		  loadItemTypes();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ItemTypeController', ItemTypeController);
