
function SalesOrderController($state, SalesOrdersService, SalesRepsService, UsersService, $rootScope, $location, _) {
  var ctrl = this;
  ctrl.salesOrders = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addSalesOrder = false;
	  ctrl.error = null;
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
	  
	  SalesRepsService.list().then(function(response){
		  ctrl.salesReps = response.data;
	  });
	  
	  
  };
  
  ctrl.selectDepot = function(){
	  loadSalesOrders();
  };
  
  function loadSalesOrders(){
	  ctrl.company = $rootScope.selectedCompany;
	  SalesOrdersService.listByDepot(ctrl.userAssignedDepot.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.salesOrders = response.data;
	  });
  }
  
  ctrl.searchPrf = function(event){
	  ctrl.prfTable.DataTable.search(event).draw();
  };
  
  ctrl.createNewSalesOrder = function (event) {
	    console.log('createNewSalesOrder');
	    $state.go('sales-order-new');
	    
  };
  
  ctrl.openModal = function(salesOrder){
	  console.log("show modal" +  ctrl.showModal);
	  ctrl.so = salesOrder;
	  SalesOrdersService.getLatestCancelledReqs(ctrl.so.id).then(function(response){
		  ctrl.cancelreqs = response.data;
		  for(var i = 0; i < ctrl.so.products.length; i++){
			  for(var j = 0; j < ctrl.cancelreqs.length; j++){
				  if(ctrl.so.products[i].id == ctrl.cancelreqs[j].salesOrderProduct.id){
					  console.log("hi" + ctrl.cancelreqs);
					  ctrl.so.products[i].cancelReq = ctrl.cancelreqs[j];
				  }
			  }
		  }
	  });
	  
	  console.log("salesOrder" + JSON.stringify(ctrl.so));

	  $('#soInfoModal').modal('show');
	  
  };
  
  ctrl.edit = function (so) {
	  $state.go('sales-order-edit', { 'soId': so.id });
  };
  /*
  ctrl.showAddSalesOrder = function (show){
	  ctrl.addSalesOrder = show;
  };
  
  
  
  ctrl.saveSalesOrder = function (event) {
	    SalesOrdersService.save(event.purchaserequest).then(function () {
	    	  loadSalesOrders();
	    	  ctrl.showAddSalesOrder(false);
	    	  ctrl.purchaserequest = null;
	    });
  };
  */
  
  ctrl.deleteSalesOrder = function (id){
	  SalesOrdersService.delete(id).then(function(response){
		  loadSalesOrders();
	  });
  };
  
 
}

angular
  .module('admin.sales')
  .controller('SalesOrderController', SalesOrderController);
