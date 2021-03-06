
function PurchaseOrdersController($state, PurchaseOrdersService, CompanyService, ReceivingReceiptsService, $rootScope, _) {
  var ctrl = this;
  ctrl.purchaseOrders = [];
  ctrl.companies = [];
  
  ctrl.searchPoNumber = '';
  ctrl.searchDueDate = '';
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  

  ctrl.$onInit = function () {
	  ctrl.error = null;
	  loadPurchaseOrders();
  };
  
  function loadPurchaseOrders(){
	  ctrl.company = $rootScope.selectedCompany;
	  PurchaseOrdersService.listByCompany(ctrl.company.id).then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.purchaseOrders = response.data;
	  });

  }
  
  ctrl.openModal = function(purchaseOrder){
	  console.log("show modal" +  ctrl.showModal);
	  console.log("purchaseRequest" + JSON.stringify(purchaseOrder));
	  ctrl.po = purchaseOrder;
	  ReceivingReceiptsService.listByCompanyForPo(ctrl.company.id, ctrl.po.id).then(function(response){
		  ctrl.receivingReceipts = response.data;
	  });
  };
  
  ctrl.viewPrf = function(prf){
	  ctrl.prf = prf;
	  $('#prfInfoModal').modal('show');
  };
  
  ctrl.viewRr = function(rr){
	  ctrl.rr = rr;
  };
}

angular
  .module('admin.purchasing')
  .controller('PurchaseOrdersController', PurchaseOrdersController);
