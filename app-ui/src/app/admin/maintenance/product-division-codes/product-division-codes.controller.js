
function ProductDivisionCodeController($state, ProductDivisionCodesService, _) {
  var ctrl = this;
  ctrl.productDivisionCodes = [];
  ctrl.searchCode = '';
  ctrl.searchName = '';
  ctrl.sortType = 'id';
  ctrl.sortReverse = false;
  ctrl.productDivisionCode = {};
  
  ctrl.$onInit = function () {
	  ctrl.addProductDivisionCode = false;
	  ctrl.error = null;
	  loadProductDivisionCodes();
  };
  
  function loadProductDivisionCodes(){
	  ProductDivisionCodesService.list().then(function(response){
		  console.log("list response: " + JSON.stringify(response.data));
		  ctrl.productDivisionCodes = response.data;
	  });
  }
  
  ctrl.showAddProductDivisionCode = function (show){
	  ctrl.addProductDivisionCode = show;
  };
  
  ctrl.editProductDivisionCode = function (id) {
	  ProductDivisionCodesService.get(id).then(function(response){
		  ctrl.productDivisionCode = response.data;
	  });
	  ctrl.addProductDivisionCode = true;
  };
  
  ctrl.saveProductDivisionCode = function () {
	    ProductDivisionCodesService.save(ctrl.productDivisionCode).then(function () {
	    	  loadProductDivisionCodes();
	    	  ctrl.showAddProductDivisionCode(false);
	    	  ctrl.productDivisionCode = null;
	    });
  };
  
  ctrl.deleteProductDivisionCode = function (id){
	  ProductDivisionCodesService.delete(id).then(function(response){
		  loadProductDivisionCodes();
	  });
  };
}

angular
  .module('admin.maintenance')
  .controller('ProductDivisionCodeController', ProductDivisionCodeController);
