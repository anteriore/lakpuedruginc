
function ReceivingReceiptController($state, ReceivingReceiptsService, $rootScope, _) {
  var ctrl = this;
  ctrl.receivingReceipts = [];

  ctrl.searchNumber = '';
  ctrl.searchDate = '';
  ctrl.searchReferenceNo  = '';
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addReceivingReceipt = false;
	  ctrl.error = null;
	  loadReceivingReceipts();
	  ctrl.status = "Pending";
  };
  
  function loadReceivingReceipts(){
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  ctrl.company = $rootScope.selectedCompany;
	  ReceivingReceiptsService.listByCompanyByStatus(ctrl.company.id, "Pending").then(function(response){
	  	  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.receivingReceipts = response.data;
	  });
  }
  
  
  ctrl.createNewReceivingReceipt = function (event) {
	    console.log('createNewReceivingReceipt');
	    $state.go('receiving-receipt-new');
  };

  ctrl.createNewReceivingReceiptTolling = function (event) {
	console.log('createNewReceivingReceipt');
	$state.go('receiving-receipt-tolling-new');
};
  
  ctrl.openModal = function(receivingReceipt){
	  console.log("show modal" +  ctrl.showModal);
	  console.log("receivingReceipt" + JSON.stringify(receivingReceipt));
	  ctrl.rr = receivingReceipt;
	  
  };
  
  ctrl.listByStatus = function(status){
	  ctrl.company = $rootScope.selectedCompany;
	  ReceivingReceiptsService.listByCompanyByStatus(ctrl.company.id, status).then(function(response){
		  ctrl.receivingReceipts = response.data;
		  ctrl.status = status;
	  });
	  
  };
  
  ctrl.editReceivingReceipt = function (id) {
	  $state.go('receiving-receipt-edit', { 'receivingReceiptId': id });
  };
  /*
  ctrl.showAddReceivingReceipt = function (show){
	  ctrl.addReceivingReceipt = show;
  };
  
  
  
  ctrl.saveReceivingReceipt = function (event) {
	    ReceivingReceiptsService.save(event.purchaserequest).then(function () {
	    	  loadReceivingReceipts();
	    	  ctrl.showAddReceivingReceipt(false);
	    	  ctrl.purchaserequest = null;
	    });
  };
  */
  
  ctrl.deleteReceivingReceipt = function (id){
	  ReceivingReceiptsService.delete(id).then(function(response){
		  loadReceivingReceipts();
	  });
  };
}

angular
  .module('admin.dashboard')
  .controller('ReceivingReceiptController', ReceivingReceiptController);
