
function FindMaterialIssuanceModalController($state, MaterialIssuancesService) {
  var ctrl = this;
  ctrl.misList = [];
  ctrl.issuedlist = [];
  ctrl.$onInit = function(){
	loadMaterialIssuance();
	};
	
	ctrl.sortType = 'mis';
	ctrl.sortReverse = false;
  
  
  function loadMaterialIssuance(){
	  ctrl.company = JSON.parse(window.localStorage.getItem('company'));
	  MaterialIssuancesService.listByStatus("Pending").then(function(response){
		  ctrl.misList = response.data;
		  console.log("response" + JSON.stringify(ctrl.misList));
	  });
  }
  
  ctrl.selectMIS = function(mis){
	  ctrl.mis = mis;
  };
  
  
}

angular
  .module('admin.shared')
  .controller('FindMaterialIssuanceModalController', FindMaterialIssuanceModalController);
