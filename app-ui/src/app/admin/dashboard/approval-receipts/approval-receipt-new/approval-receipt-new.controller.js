
function ApprovedReceiptNewController($state, ApprovedReceiptsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.ar = {
    		company: $rootScope.selectedCompany,
    		receivedBy: ctrl.user
    };
  };

  ctrl.createApprovedReceipt = function (event) {
    ApprovedReceiptsService.save(event.ar).then(function (response) {
    	  console.log("createApprovedReceipt " + JSON.stringify(response.data));
        $state.go('approved-receipts');
    });

  };
}

angular
  .module('admin.dashboard')
  .controller('ApprovedReceiptNewController', ApprovedReceiptNewController);
