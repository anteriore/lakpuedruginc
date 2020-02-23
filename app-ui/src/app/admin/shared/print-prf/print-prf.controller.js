
function PrintPrfController($state, PurchaseRequestsService, $stateParams, $rootScope) {
  var ctrl = this;
  
  console.log("prfId", $stateParams.prfId);
  
  PurchaseRequestsService.get($stateParams.prfId).then(function(res) {
    ctrl.prf = res.data;
  }).then(() => {
    setTimeout(function(){
      window.print();
      window.close();
    }, 1500);
  });;
}

angular
  .module('admin.shared')
  .controller('PrintPrfController', PrintPrfController);
