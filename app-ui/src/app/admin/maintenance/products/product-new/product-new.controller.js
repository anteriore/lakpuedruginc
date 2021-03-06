
function ProductNewController($state, ProductsService, CompanyService, DepartmentsService, PermissionsService) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.product = {
    		company: ctrl.user.company
    };
  };

  ctrl.createProduct = function (event) {
	console.log("create " + JSON.stringify(event.product));
    ProductsService.save(event.product).then(function () {
      $state.go('products');
    });

  };
}

angular
  .module('admin.maintenance')
  .controller('ProductNewController', ProductNewController);
