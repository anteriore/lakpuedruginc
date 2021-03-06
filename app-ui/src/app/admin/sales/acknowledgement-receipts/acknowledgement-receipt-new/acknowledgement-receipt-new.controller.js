
function AcknowledgementReceiptNewController($state, AcknowledgementReceiptsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.ar = {
    		company: $rootScope.selectedCompany,
    		preparedBy: ctrl.user,
    		releasedBy: ctrl.user,
    		checkedBy: ctrl.user,
    		approvedBy: ctrl.user
    };
  };

  ctrl.createAcknowledgementReceipt = function (event) {
    AcknowledgementReceiptsService.save(event.ar).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
      $state.go('acknowledgement-receipts');
    });

  };
}

angular
  .module('admin.sales')
  .controller('AcknowledgementReceiptNewController', AcknowledgementReceiptNewController);
