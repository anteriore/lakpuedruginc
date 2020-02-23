
function ReturnSlipFormController($state, ReturnSlipsService, SalesSlipsService, ProductInventoryService, PurchaseOrdersService, UsersService, $rootScope) {
  var ctrl = this;
  
  ctrl.stockOnHandList = [];
  ctrl.reserved= [];
  ctrl.$onInit = function(){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.depots = response.data.depots;
	  });
	  
	  ctrl.rs.date = new Date();
  };
  ctrl.$onChanges = function (changes) {
    if (changes.rs) {
      ctrl.rs = angular.copy(ctrl.rs);
    }
  };
  
  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.rs));
    ctrl.onSubmit({
      $event: {
    	  rs: ctrl.rs
      }
    });
  };
  
  ctrl.computeTotalAmount = function(value, index){
	  ctrl.rs.returnSlipProducts[index].amount = value;
	  ctrl.rs.totalAmount = 0;
	  for(var i = 0; i < ctrl.rs.returnSlipProducts.length; i++){
		  ctrl.rs.totalAmount += ctrl.rs.returnSlipProducts[i].goodQuantity * ctrl.rs.returnSlipProducts[i].unitPrice ;
	  }
  };
  
  ctrl.findSalesSlip = function(){
	  SalesSlipsService.listByDepot(ctrl.rs.depot.id).then(function(response){
		  ctrl.salesSlips = response.data;
		  console.log(response.data);
		  $("#salesSlipsModal").modal("show");
	  });
  };
  
  ctrl.findProduct = function(){
	  ProductInventoryService.listByDepot(ctrl.rs.depot.id).then(function(response){
		  ctrl.productsInDepot = response.data;
		  console.log(JSON.stringify(response.data));
		  $("#findProductModal").modal('show');
	  });
  };
  


}

angular
  .module('admin.sales')
  .controller('ReturnSlipFormController', ReturnSlipFormController);
