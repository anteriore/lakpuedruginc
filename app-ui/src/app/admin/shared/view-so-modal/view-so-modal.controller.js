
function ViewSoModalController($state, SalesOrdersService, $rootScope) {
  var ctrl = this;
  ctrl.cancelledItem = {};
  
  ctrl.$onInit = function(){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  ctrl.cancelledItem = {cancelledBy: ctrl.user};
  };
  
  ctrl.approve = function(id){
	  SalesOrdersService.approve(id).then(function(response){
		  console.log("Approved" + id);
		  window.location.reload();
	  });
  };
  
  ctrl.reject = function(id){
	  SalesOrdersService.reject(id).then(function(response){
		  console.log("Rejected" + id);
		  window.location.reload();
	  });
  };
  
  ctrl.cancelItem = function(item)
  {
	  console.log(JSON.stringify(item));
	  ctrl.cancelledItem = {};
	  ctrl.cancelledItem.salesOrderProduct = item;
	  ctrl.cancelledItem.date = new Date();
	  ctrl.cancelledItem.cancelledBy = ctrl.user;
	  console.log(ctrl.cancelledItem);
  };
  
  
  ctrl.submitCancel = function(){
	  console.log("Cancelled Item " + JSON.stringify(ctrl.cancelledItem));
	  SalesOrdersService.cancelRequestedProduct(ctrl.cancelledItem).then(function(response){
		  console.log("inserted " + JSON.stringify(response.data));
		  window.location.reload()
	  });
  };
  
}

angular
  .module('admin.shared')
  .controller('ViewSoModalController', ViewSoModalController);
