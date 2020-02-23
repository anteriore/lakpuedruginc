
function PrintJournalVoucherController($state, JournalVouchersService, $stateParams, $rootScope) {
  var ctrl = this;
  
  console.log("journalVoucherId", $stateParams.journalVoucherId);
  
  JournalVouchersService.get($stateParams.journalVoucherId).then(function(res) {
    ctrl.jv = res.data;
    ctrl.approvedBy = ctrl.jv.approvedBy != null ? ctrl.jv.approvedBy.firstName + " " + ctrl.jv.approvedBy.lastName : "";
    ctrl.preparedBy = ctrl.jv.preparedBy.firstName + " " + ctrl.jv.preparedBy.lastName;
  }).then(() => {
    setTimeout(function(){
      window.print();
      window.close();
    }, 0);
  });;
}

angular
  .module('admin.shared')
  .controller('PrintJournalVoucherController', PrintJournalVoucherController);
