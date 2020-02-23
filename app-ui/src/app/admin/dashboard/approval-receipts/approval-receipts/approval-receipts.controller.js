
function ApprovedReceiptController($state, $rootScope, _, ApprovedReceiptsService) {
  var ctrl = this;
  ctrl.approvalReceipts = [];

  ctrl.searchNumber = '';
  ctrl.searchRRNumber = '';
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addPurchaseRequest = false;
	  ctrl.error = null;
	  loadApprovedReceipts();
  };
  
  function loadApprovedReceipts(){
    ApprovedReceiptsService.list().then((response) => {
      ctrl.approvalReceipts = response.data;
      console.log("response approved receipt" + JSON.stringify(ctrl.approvalReceipts));
    });
	  
  }

  ctrl.openModal = function(approvedReceipt){
	  console.log("openModal");
    ctrl.ar = approvedReceipt;
  };

  ctrl.openModalApprovedItem = function(approvedItem) {
    console.log("openModalApprovedItem");
    ctrl.approvedItem = approvedItem;
  };
  
}

angular
  .module('admin.dashboard')
  .controller('ApprovedReceiptController', ApprovedReceiptController);
