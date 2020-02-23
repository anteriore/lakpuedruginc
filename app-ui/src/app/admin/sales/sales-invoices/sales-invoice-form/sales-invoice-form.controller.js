
function SalesInvoiceFormController($state, SalesInvoicesService, SalesOrdersService, ProductInventoryService, UsersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onChanges = function (changes) {
    if (changes.si) {
      ctrl.si = angular.copy(ctrl.si);
    }
  };
  
  ctrl.$onInit = function() {
	  ctrl.si.orderedProducts = [];
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.depots = response.data.depots;
	  });
	  ctrl.type = "DR_SI";
	  ctrl.si.date = new Date();
  };

  ctrl.computeTotalAmount = function(value, index){
	  ctrl.si.orderedProducts[index].amount = value;
	  ctrl.si.totalAmount = 0;
	  for(var i = 0; i < ctrl.si.orderedProducts.length; i++){
		  ctrl.si.totalAmount += ctrl.si.orderedProducts[i].quantity * ctrl.si.orderedProducts[i].unitPrice ;
	  }
  };
  
  ctrl.addVat = function(){
	  if(ctrl.si.vat){
		 ctrl.si.totalAmount = ctrl.si.totalAmount + (ctrl.si.totalAmount * 0.12);
	  }else{
		 ctrl.si.totalAmount = ctrl.si.totalAmount - (ctrl.si.totalAmount * 0.12);
	  }
  };

  
  ctrl.showSoProductModal = function(fg){
	  ctrl.company = $rootScope.selectedCompany;
	  console.log("SALES ORDER NUMBER" + ctrl.si.salesOrder.number);
	  ProductInventoryService.listByDepotAndFinishedGood(ctrl.si.depot.id, fg.id).then(function(response){
		  ctrl.inventorylist = response.data;
		  $("#findSoProductModal").modal('show');
		  
	  });
	  
	  
  };
  
  
  ctrl.getProductsOfFg = function (fg){
	  var array = [];
	  for(var i = 0; i < ctrl.si.orderedProducts.length ; i++){
		  if(fg.finishedGood.id == ctrl.si.orderedProducts[i].product.finishedGood.id){
			  array.push(ctrl.si.orderedProducts[i]);
		  }
	  }
	  return array;
  };
  
  ctrl.findSoModal = function(){
	  ctrl.company = $rootScope.selectedCompany;
	  SalesOrdersService.listNotCompletedByCompanyAndDepot(ctrl.company.id, ctrl.si.depot.id, ctrl.type).then(function(response){
		  ctrl.salesOrders = response.data;
		  console.log("ressonse" + JSON.stringify(ctrl.salesOrders));
		  $("#findSoModal").modal("show");
	  });
	  
  };
  
  ctrl.getTotalQuantity = function(fg){
	  var sum = 0;
	  for(var i = 0; i < ctrl.si.orderedProducts.length ; i++){
		  if(fg.finishedGood.id == ctrl.si.orderedProducts[i].product.finishedGood.id){
			  sum += ctrl.si.orderedProducts[i].quantity;
		  }
	  }
	  return sum;
  };
 
  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.si));
    for(var i = 0; i < ctrl.si.orderedProducts.length; i++){
    	ctrl.si.orderedProducts[i].orderSlipNo = ctrl.si.number;
    }
    
    ctrl.si.type = "DR_SI";
    ctrl.onSubmit({
      $event: {
    	  si: ctrl.si
      }
    });
  };
  
}

angular
  .module('admin.sales')
  .controller('SalesInvoiceFormController', SalesInvoiceFormController);
