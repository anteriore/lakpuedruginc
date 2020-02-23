
function AccountCodeController($state, AccountCodesService, _) {
  var ctrl = this;
  ctrl.accountCodes = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.accountCode = {};
  
  ctrl.$onInit = function () {
	  ctrl.addAccountCode = false;
	  ctrl.error = null;
	  loadAccountCodes();
  };
  
  function loadAccountCodes(){
	  AccountCodesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.accountCodes = response.data;
	  });
  }
  
  ctrl.showAddAccountCode = function (show){
	  ctrl.addAccountCode = show;
  };
  
  ctrl.editAccountCode = function (id) {
	  AccountCodesService.get(id).then(function(response){
		  ctrl.accountCode = response.data;
	  });
	  ctrl.addAccountCode = true;
  };
  
  ctrl.saveAccountCode = function () {
	    AccountCodesService.save(ctrl.accountCode).then(function () {
	    	  loadAccountCodes();
	    	  ctrl.showAddAccountCode(false);
	    	  ctrl.accountCode = null;
	    });
  };
  
  ctrl.deleteAccountCode = function (id){
	  AccountCodesService.delete(id).then(function(response){
		  loadAccountCodes();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('AccountCodeController', AccountCodeController);
