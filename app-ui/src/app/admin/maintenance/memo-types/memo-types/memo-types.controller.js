
function MemoTypeController($state, MemoTypesService, _) {
  var ctrl = this;
  ctrl.memoTypes = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addMemoType = false;
	  ctrl.error = null;
	  loadMemoTypes();
  };
  
  function loadMemoTypes(){
	  MemoTypesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.memoTypes = response.data;
	  });
  }
  
  ctrl.showAddMemoType = function (show){
	  ctrl.addMemoType = show;
  };
  
  ctrl.editMemoType = function (id) {
	  MemoTypesService.get(id).then(function(response){
		  ctrl.memotype = response.data;
	  });
	  ctrl.addMemoType = true;
  };
  
  ctrl.saveMemoType = function (event) {
	    MemoTypesService.save(event.memotype).then(function () {
	    	  loadMemoTypes();
	    	  ctrl.showAddMemoType(false);
	    	  ctrl.memotype = null;
	    });
  };
  
  ctrl.deleteMemoType = function (id){
	  MemoTypesService.delete(id).then(function(response){
		  loadMemoTypes();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('MemoTypeController', MemoTypeController);
