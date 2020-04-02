function AcknowledgementReceiptController(
  $state,
  AcknowledgementReceiptsService,
  UsersService,
  $rootScope,
  $location,
  _
) {
  var ctrl = this;
  ctrl.acknowledgementReceipts = [];

  ctrl.sortType = 'date';
  ctrl.sortReverse = false;

  ctrl.$onInit = function() {
    ctrl.addAcknowledgementReceipt = false;
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
    UsersService.get(ctrl.user.id).then(function(response) {
      ctrl.userAssignedDepots = response.data.depots;
    });
  };

  ctrl.selectDepot = function() {
    loadAcknowledgementReceipts();
  };

  function loadAcknowledgementReceipts() {
    ctrl.company = $rootScope.selectedCompany;
    AcknowledgementReceiptsService.listByDepot(ctrl.userAssignedDepot.id).then(
      function(response) {
        console.log('list response: {}', response.data);
        ctrl.acknowledgementReceipts = response.data;
      }
    );
  }

  ctrl.openModal = function(ar) {
    ctrl.ar = ar;
  };

  ctrl.createNewAcknowledgementReceipt = function(event) {
    console.log('createNewAcknowledgementReceipt');
    $state.go('acknowledgement-receipt-new');
  };
}

angular
  .module('admin.sales')
  .controller(
    'AcknowledgementReceiptController',
    AcknowledgementReceiptController
  );
