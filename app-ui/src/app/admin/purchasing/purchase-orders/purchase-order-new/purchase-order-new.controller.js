
function PurchaseOrderNewController($state, PurchaseOrdersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.po = {
    		company: $rootScope.selectedCompany,
    		department: ctrl.user.department
    };
  };

  ctrl.createPurchaseOrder = function (event) {
    PurchaseOrdersService.save(event.po).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
      $state.go('purchase-orders');
    });

  };
}

angular
  .module('admin.purchasing')
  .controller('PurchaseOrderNewController', PurchaseOrderNewController);
