
function JournalVoucherEditController($state, $stateParams, JournalVouchersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    
    console.log('pjvId: ' + JSON.stringify($stateParams.journalVoucherId));
    
    JournalVouchersService.get($stateParams.journalVoucherId).then(function(response){
    	ctrl.jv = response.data;
    	ctrl.jv.preparedBy = ctrl.user;
    	console.log("asdasd" + JSON.stringify(ctrl.jv));
    });
    
  };

  ctrl.editJournalVoucher = function (event) {
    JournalVouchersService.save(event.pv).then(function (response) {
    	  console.log("editJournalVoucher " + JSON.stringify(response.data));
        $state.go('journal-vouchers');
    });

  };
}

angular
  .module('admin.accounting')
  .controller('JournalVoucherEditController', JournalVoucherEditController);
