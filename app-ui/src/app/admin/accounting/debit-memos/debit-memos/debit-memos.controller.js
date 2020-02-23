
function DebitMemoController($state, DebitMemosService, UsersService, $rootScope, _) {
  var ctrl = this;
  ctrl.debitMemos = [];

  
  ctrl.sortType = 'date';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addDebitMemo = false;
	  ctrl.error = null;
	  ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.userAssignedDepots = response.data.depots;
	  });
  };
  
  ctrl.selectDepot = function (){
	  loadDebitMemos();
  };
  
  function loadDebitMemos(){
	  DebitMemosService.listByDepot(ctrl.userAssignedDepot.id).then(function(response){
	  	  console.log("list response: {}", response.data);
		  ctrl.debitMemos = response.data;
	  });
  }
  
  ctrl.searchPrf = function(event){
	  ctrl.debitMemoTable.DataTable.search(event).draw();
  };
  
  ctrl.createNewDebitMemo = function (event) {
	    console.log('createNewDebitMemo');
	    $state.go('debit-memo-new');
  };
  
  ctrl.openModal = function(debitMemo){
	  console.log("show modal" +  ctrl.showModal);
	  console.log("debitMemo" + JSON.stringify(debitMemo));
	  ctrl.debitMemo = debitMemo;
	  $('#debitMemoInfoModal').modal('show');
	  
  };
  
}

angular
  .module('admin.accounting')
  .controller('DebitMemoController', DebitMemoController);
