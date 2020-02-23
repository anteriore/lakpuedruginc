
function BankAccountController($state, BankAccountsService, _) {
  var ctrl = this;
  ctrl.bankAccounts = [];

  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  
  ctrl.$onInit = function () {
	  ctrl.addBankAccount = false;
	  ctrl.error = null;
    ctrl.getData(ctrl.currentPage);
  };
  
  function loadBankAccounts(){
	  BankAccountsService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.bankAccounts = response.data;
	  });
  }

  ctrl.totalCount = 0;
  ctrl.itemsPerPage = 30;
  ctrl.currentPage = 1;

  ctrl.getData = function(page) {
    BankAccountsService.paginate(ctrl.itemsPerPage, (page - 1) * ctrl.itemsPerPage).then((res) => {
      var data = res.data;
      ctrl.currentPage = page;
      ctrl.totalCount = data.totalElements;
      ctrl.bankAccounts = data.content;
    });
  }
  
  ctrl.showAddBankAccount = function (show){
	  ctrl.addBankAccount = show;
  };
  
  ctrl.editBankAccount = function (id) {
	  BankAccountsService.get(id).then(function(response){
		  ctrl.bankaccount = response.data;
	  });
	  ctrl.addBankAccount = true;
  };
  
  ctrl.saveBankAccount = function (event) {
	    BankAccountsService.save(event.bankaccount).then(function () {
          ctrl.getData(ctrl.currentPage);
	    	  ctrl.showAddBankAccount(false);
	    	  ctrl.bankaccount = null;
	    });
  };
  
  ctrl.deleteBankAccount = function (id){
	  BankAccountsService.delete(id).then(function(response){
		  ctrl.getData(ctrl.currentPage);
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('BankAccountController', BankAccountController);
