
function JournalVoucherNewController($state, JournalVouchersService, $rootScope) {
  var ctrl = this;
  
  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem("currentUser"));
    ctrl.company = $rootScope.selectedCompany;
    ctrl.jv = {
    		company: ctrl.company,
    		date: new Date(),
    		accountTitles: [],
    		adjustment: false,
    		type: "JV",
    		preparedBy: ctrl.user
    }
    };

  ctrl.createJournalVoucher = function (event) {
    JournalVouchersService.save(event.jv).then(function (response) {
    	  console.log("createJournalVoucher " + JSON.stringify(response.data));
        $state.go('journal-vouchers');
    });

  };
}

angular
  .module('admin.accounting')
  .controller('JournalVoucherNewController', JournalVoucherNewController);
