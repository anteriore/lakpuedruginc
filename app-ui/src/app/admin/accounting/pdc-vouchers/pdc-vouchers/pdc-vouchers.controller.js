
function PdcVoucherController($state, PdcVouchersService, $rootScope) {
  var ctrl = this;
  
  ctrl.pdcVouchers = [];

  ctrl.searchNumber = '';
  ctrl.searchRRNumber = '';
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  
  ctrl.$onInit = function () {
	  ctrl.addPurchaseRequest = false;
	  ctrl.error = null;
	  loadPdcVouchers();
  };
  
  
  function loadPdcVouchers(){
	ctrl.company = $rootScope.selectedCompany;
	PdcVouchersService.list().then((response) => {
      ctrl.pdcVouchers = response.data;
      console.log("response purchase voucher" + JSON.stringify(ctrl.pdcVouchers));
    });
	
	  
  }

  ctrl.openModal = function(pdcVoucher){
	  console.log("openModal");
    ctrl.pdc = pdcVoucher;
  };
  
  
  ctrl.print = function(){
	  window.print();
  };
  
/*
  ctrl.openModalApprovedItem = function(approvedItem) {
    console.log("openModalApprovedItem");
    ctrl.approvedItem = approvedItem;
  };*/
  
}

angular
  .module('admin.accounting')
  .controller('PdcVoucherController', PdcVoucherController);
