
function ProductFormController($state, ProductsService, ProductDivisionCodesService, ProductCategoriesService, UnitsService, PurchaseOrdersService, UsersService, ClassificationsService) {
  var ctrl = this;
  ctrl.$onChanges = function (changes) {
    if (changes.product) {
      ctrl.product = angular.copy(ctrl.product);
    }
  };
  
  ctrl.$onInit = function(){
	  ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
	  ClassificationsService.list().then(function(response){
		  ctrl.classifications = response.data;
	  });
	  ProductCategoriesService.list().then(function(response){
		  ctrl.categories = response.data;
	  });
	  
	  ProductDivisionCodesService.list().then(function(response){
		  ctrl.divisions = response.data;
	  });
	  UnitsService.list().then(function(response){
		  ctrl.units = response.data;
	  });
	  UsersService.get(ctrl.user.id).then(function(response){
		  ctrl.depots = response.data.depots;
	  });
  };
  
  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.product));
    
    ctrl.onSubmit({
      $event: {
    	  product: ctrl.product
      }
    });
  };



  
}

angular
  .module('admin.maintenance')
  .controller('ProductFormController', ProductFormController);
