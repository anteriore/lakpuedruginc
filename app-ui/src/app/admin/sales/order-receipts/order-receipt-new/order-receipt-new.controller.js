
function OrderReceiptNewController($state, OrderReceiptsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.or = {
    		preparedBy: ctrl.user,
    		date: new Date()
    };
  };

  ctrl.createOrderReceipt = function (event) {
    OrderReceiptsService.save(event.or).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
      $state.go('order-receipts');
    });

  };
}

angular
  .module('admin.sales')
  .controller('OrderReceiptNewController', OrderReceiptNewController);
