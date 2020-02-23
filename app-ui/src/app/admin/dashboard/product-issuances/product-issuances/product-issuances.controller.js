
function ProductIssuancesController($state, ProductIssuancesService, $rootScope, _) {
  var ctrl = this;
  ctrl.productIssuanceSlips = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addProductIssuances = false;
	  ctrl.error = null;
	  loadProductIssuances();
  };
  
  function loadProductIssuances(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  ProductIssuancesService.listByCompany(ctrl.company.id).then(function(response){
	  	  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.productIssuanceSlips = response.data;
	  });
  }
  
  ctrl.openModal = function(inventory){
	  ctrl.pis = inventory;
	  
  };
  
  ctrl.createNewPIS = function (event) {
	  console.log("new pis");
	    $state.go('product-issuance-new');
  };
}

angular
  .module('admin.dashboard')
  .controller('ProductIssuancesController', ProductIssuancesController);
