
function PdcDisbursementNewController($state, PdcDisbursementsService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    ctrl.pdc = {
    		company: ctrl.company,
    		date: new Date(),
    		cheques: []
    }
    };

  ctrl.createPdcDisbursement = function (event) {
    PdcDisbursementsService.save(event.pdc).then(function (response) {
    	  console.log("createPdcDisbursement " + JSON.stringify(response.data));
    	  alert("PDC Disbursement successfully added");
    	  $state.go("pdc-disbursements");
    });

  };
}

angular
  .module('admin.accounting')
  .controller('PdcDisbursementNewController', PdcDisbursementNewController);
