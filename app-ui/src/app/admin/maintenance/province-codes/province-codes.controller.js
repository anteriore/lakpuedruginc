
function ProvinceCodeController($state, ProvinceCodesService, _) {
  var ctrl = this;
  ctrl.provinceCodes = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.provinceCode = {};
  
  ctrl.$onInit = function () {
	  ctrl.addProvinceCode = false;
	  ctrl.error = null;
	  loadProvinceCodes();
  };
  
  function loadProvinceCodes(){
	  ProvinceCodesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.provinceCodes = response.data;
	  });
  }
  
  ctrl.showAddProvinceCode = function (show){
	  ctrl.addProvinceCode = show;
  };
  
  ctrl.editProvinceCode = function (id) {
	  ProvinceCodesService.get(id).then(function(response){
		  ctrl.provinceCode = response.data;
	  });
	  ctrl.addProvinceCode = true;
  };
  
  ctrl.saveProvinceCode = function () {
	    ProvinceCodesService.save(ctrl.provinceCode).then(function () {
	    	  loadProvinceCodes();
	    	  ctrl.showAddProvinceCode(false);
	    	  ctrl.provinceCode = null;
	    });
  };
  
  ctrl.deleteProvinceCode = function (id){
	  ProvinceCodesService.delete(id).then(function(response){
		  loadProvinceCodes();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ProvinceCodeController', ProvinceCodeController);
