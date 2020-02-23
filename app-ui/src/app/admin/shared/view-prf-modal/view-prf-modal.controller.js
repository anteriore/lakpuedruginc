
function ViewPrfModalController($state, PurchaseRequestsService, $rootScope) {
  var ctrl = this;
  ctrl.cancelledItem = {};
  
  ctrl.$onInit = function(){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  ctrl.cancelledItem = {cancelledBy: ctrl.user};
  };
  
  ctrl.approve = function(id){
	  PurchaseRequestsService.approve(id).then(function(response){
		  console.log("Approved" + id);
		  window.location.reload();
	  });
  };
  
  ctrl.reject = function(id){
	  PurchaseRequestsService.reject(id).then(function(response){
		  console.log("Rejected" + id);
		  window.location.reload();
	  });
  };
  
  ctrl.cancelItem = function(item)
  {
	  console.log(JSON.stringify(item));
	  ctrl.cancelledItem = {};
	  ctrl.cancelledItem.requestedItem = item;
	  ctrl.cancelledItem.date = new Date();
	  ctrl.cancelledItem.cancelledBy = ctrl.user;
	  console.log(ctrl.cancelledItem);
  };
  
  
  ctrl.submitCancel = function(){
	  
	  console.log("Cancelled Item " + JSON.stringify(ctrl.cancelledItem));
	  PurchaseRequestsService.cancelRequestedItem(ctrl.cancelledItem).then(function(response){
		  console.log("inserted " + JSON.stringify(response.data));
		  window.location.reload();
	  });
  };
  
}

angular
  .module('admin.shared')
  .controller('ViewPrfModalController', ViewPrfModalController);
