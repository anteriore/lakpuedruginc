
function SalesInvoiceNewController($state, SalesInvoicesService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.si = {
    		company: $rootScope.selectedCompany,
    		preparedBy: ctrl.user,
    		releasedBy: ctrl.user,
    		checkedBy: ctrl.user,
    		approvedBy: ctrl.user
    };
  };

  ctrl.createSalesInvoice = function (event) {
    SalesInvoicesService.save(event.si).then(function (response) {
    	  console.log("create " + JSON.stringify(response.data));
      $state.go('sales-invoices');
    });

  };
}

angular
  .module('admin.sales')
  .controller('SalesInvoiceNewController', SalesInvoiceNewController);
