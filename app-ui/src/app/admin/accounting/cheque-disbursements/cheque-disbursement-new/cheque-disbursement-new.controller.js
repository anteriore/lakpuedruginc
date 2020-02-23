
function ChequeDisbursementNewController($state, ChequeDisbursementsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    ctrl.cp = {
        company: ctrl.company,
        accountTitles:[]
    }
    };

  ctrl.createChequeDisbursement = function (event) {
    ChequeDisbursementsService.save(event.cp).then(function (response) {
    	  console.log("createChequeDisbursement " + JSON.stringify(response.data));
        $state.go('cheque-disbursements');
    });

  };
}

angular
  .module('admin.accounting')
  .controller('ChequeDisbursementNewController', ChequeDisbursementNewController);
