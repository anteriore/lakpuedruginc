
function OrderSlipController($state, OrderSlipsService, UsersService, $rootScope, $location, _) {
  var ctrl = this;
  ctrl.orderSlips = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addOrderSlip = false;
	  ctrl.error = null;
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
  };
  
  ctrl.selectDepot = function (){
	  loadOrderSlips();
  };
  
  function loadOrderSlips(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  OrderSlipsService.listByDepot(ctrl.userAssignedDepot.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.orderSlips = response.data;
	  });
  }
  
  ctrl.searchPrf = function(event){
	  ctrl.prfTable.DataTable.search(event).draw();
  };
  
  ctrl.createNewOrderSlip = function (event) {
	    console.log('createNewOrderSlip');
	    $state.go('order-slip-new');
	    
  };
  
  ctrl.openModal = function(orderSlip){
	  ctrl.os = orderSlip;
  };
  
  /*
  ctrl.showAddOrderSlip = function (show){
	  ctrl.addOrderSlip = show;
  };
  
  
  
  ctrl.saveOrderSlip = function (event) {
	    OrderSlipsService.save(event.purchaserequest).then(function () {
	    	  loadOrderSlips();
	    	  ctrl.showAddOrderSlip(false);
	    	  ctrl.purchaserequest = null;
	    });
  };
  */
  
  ctrl.deleteOrderSlip = function (id){
	  OrderSlipsService.delete(id).then(function(response){
		  loadOrderSlips();
	  });
  };
  
 
}

angular
  .module('admin.sales')
  .controller('OrderSlipController', OrderSlipController);
