
function PurchaseRequestController($state, PurchaseRequestsService, $rootScope, $location, _) {
  var ctrl = this;
  ctrl.purchaseRequests = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addPurchaseRequest = false;
	  ctrl.error = null;
	  if(window.location.href.includes("?eng=1")){
		  loadEngineeringPurchaseRequests();
	  }else{
		  loadPurchaseRequests();
	  }
	  
  };
  
  function loadEngineeringPurchaseRequests(){
	  ctrl.company = $rootScope.selectedCompany;
	  PurchaseRequestsService.listByCompanyAndDepartment(ctrl.company.id, "Engineering").then(function(response){
		 ctrl.purchaseRequests = response.data; 
	  });
  }
  function loadPurchaseRequests(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  PurchaseRequestsService.listByCompany(ctrl.company.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.purchaseRequests = response.data;
	  });
  }
  
  ctrl.searchPrf = function(event){
	  ctrl.prfTable.DataTable.search(event).draw();
  };
  
  ctrl.createNewPurchaseRequest = function (event) {
	    console.log('createNewPurchaseRequest');
	    if(window.location.href.includes("?eng=1")){
	    	console.log("department eng");
	    	$state.go('purchase-request-eng');
	    }else{
	    	$state.go('purchase-request-new');
	    }
	    
  };
  
  ctrl.openModal = function(purchaseRequest){
	  console.log("show modal" +  ctrl.showModal);
	  ctrl.prf = purchaseRequest;
	  PurchaseRequestsService.getLatestCancelledReqs(ctrl.prf.id).then(function(response){
		  ctrl.cancelreqs = response.data;
		  console.log("req items length" + ctrl.prf.requestedItems.length);
		  console.log("cancel items length" + ctrl.cancelreqs.length)
		  for(var i = 0; i < ctrl.prf.requestedItems.length; i++){
			  for(var j = 0; j < ctrl.cancelreqs.length; j++){
				  if(ctrl.prf.requestedItems[i].id == ctrl.cancelreqs[j].requestedItem.id){
					  console.log("hi" + ctrl.cancelreqs);
					  ctrl.prf.requestedItems[i].cancelReq = ctrl.cancelreqs[j];
				  }
			  }
		  }
	  });
	  
	  console.log("purchaseRequest" + JSON.stringify(ctrl.prf));

	  $('#prfInfoModal').modal('show');
	  
  };
  
  ctrl.edit = function (prf) {
	  $state.go('purchase-request-edit', { 'prfId': prf.id });
  };
  /*
  ctrl.showAddPurchaseRequest = function (show){
	  ctrl.addPurchaseRequest = show;
  };
  
  
  
  ctrl.savePurchaseRequest = function (event) {
	    PurchaseRequestsService.save(event.purchaserequest).then(function () {
	    	  loadPurchaseRequests();
	    	  ctrl.showAddPurchaseRequest(false);
	    	  ctrl.purchaserequest = null;
	    });
  };
  */
  
  ctrl.deletePurchaseRequest = function (id){
	  PurchaseRequestsService.delete(id).then(function(response){
		  loadPurchaseRequests();
	  });
  };
  
 
}

angular
  .module('admin.dashboard')
  .controller('PurchaseRequestController', PurchaseRequestController);
