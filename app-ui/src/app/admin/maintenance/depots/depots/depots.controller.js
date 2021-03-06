
function DepotController($state, DepotsService, _) {
  var ctrl = this;
  ctrl.depots = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.searchArea = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addDepot = false;
	  ctrl.error = null;
	  loadDepots();
  };
  
  function loadDepots(){
	  DepotsService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.depots = response.data;
	  });
  }
  
  ctrl.showAddDepot = function (show){
	  ctrl.addDepot = show;
  };
  
  ctrl.editDepot = function (id) {
	  DepotsService.get(id).then(function(response){
		  ctrl.depot = response.data;
	  });
	  ctrl.addDepot = true;
  };
  
  ctrl.saveDepot = function (event) {
	    DepotsService.save(event.depot).then(function () {
	    	  loadDepots();
	    	  ctrl.showAddDepot(false);
	    	  ctrl.depot = null;
	    });
  };
  
  ctrl.deleteDepot = function (id){
	  DepotsService.delete(id).then(function(response){
		  loadDepots();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('DepotController', DepotController);
