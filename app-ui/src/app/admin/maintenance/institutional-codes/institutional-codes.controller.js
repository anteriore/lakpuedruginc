
function InstitutionalCodeController($state, InstitutionalCodesService, _) {
  var ctrl = this;
  ctrl.institutionalCodes = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.institutionalCode = {};
  
  ctrl.$onInit = function () {
	  ctrl.addInstitutionalCode = false;
	  ctrl.error = null;
	  loadInstitutionalCodes();
  };
  
  function loadInstitutionalCodes(){
	  InstitutionalCodesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.institutionalCodes = response.data;
	  });
  }
  
  ctrl.showAddInstitutionalCode = function (show){
	  ctrl.addInstitutionalCode = show;
  };
  
  ctrl.editInstitutionalCode = function (id) {
	  InstitutionalCodesService.get(id).then(function(response){
		  ctrl.institutionalCode = response.data;
	  });
	  ctrl.addInstitutionalCode = true;
  };
  
  ctrl.saveInstitutionalCode = function () {
	    InstitutionalCodesService.save(ctrl.institutionalCode).then(function () {
	    	  loadInstitutionalCodes();
	    	  ctrl.showAddInstitutionalCode(false);
	    	  ctrl.institutionalCode = null;
	    });
  };
  
  ctrl.deleteInstitutionalCode = function (id){
	  InstitutionalCodesService.delete(id).then(function(response){
		  loadInstitutionalCodes();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('InstitutionalCodeController', InstitutionalCodeController);
