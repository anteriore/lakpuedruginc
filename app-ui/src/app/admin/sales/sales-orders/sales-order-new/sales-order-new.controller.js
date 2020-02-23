
function SalesOrderNewController($state, $stateParams, SalesOrdersService, CompanyService, DepartmentsService, PermissionsService) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.so = {
    		requestedBy : ctrl.user,
    		company: ctrl.user.company,
    		preparedBy : ctrl.user,
    		checkedBy : ctrl.user,
    		products: []
    };
  };

  ctrl.createSalesOrder = function (event) {
	console.log("create " + JSON.stringify(event.so));
    SalesOrdersService.save(event.so).then(function () {
      $state.go('sales-orders');
    });

  };
}

angular
  .module('admin.sales')
  .controller('SalesOrderNewController', SalesOrderNewController);
