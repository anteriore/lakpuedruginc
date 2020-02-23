
function ChequeDisbursementController($state, ChequeDisbursementsService, $rootScope) {
  var ctrl = this;
  
  ctrl.chequeDisbursements = [];

  ctrl.searchNumber = '';
  ctrl.searchRRNumber = '';
  ctrl.sortType = 'number';
  ctrl.sortReverse = false;
  
  
  ctrl.$onInit = function () {
	  ctrl.addJournalRequest = false;
	  ctrl.error = null;
	  loadChequeDisbursements();
  };
  
  
  function loadChequeDisbursements(){
	ctrl.company = $rootScope.selectedCompany;
	ChequeDisbursementsService.listByCompany(ctrl.company.id).then((response) => {
      ctrl.chequeDisbursements = response.data;
      console.log("response v" + JSON.stringify(ctrl.chequeDisbursements));
    });
	  
  }

  ctrl.viewVp = function(vp){
	  ctrl.vp = vp;
  };
  
  ctrl.openModal = function(chequeDisbursement){
	  console.log("openModal");
    ctrl.cp = chequeDisbursement;
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
  .controller('ChequeDisbursementController', ChequeDisbursementController);
