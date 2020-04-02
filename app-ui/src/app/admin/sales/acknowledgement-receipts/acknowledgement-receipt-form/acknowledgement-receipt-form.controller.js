function AcknowledgementReceiptFormController(
  $state,
  AcknowledgementReceiptsService,
  OrderSlipsService,
  SalesInvoicesService,
  UsersService,
  SalesSlipsService,
  $rootScope
) {
  var ctrl = this;

  ctrl.$onChanges = function(changes) {
    if (changes.ar) {
      ctrl.ar = angular.copy(ctrl.ar);
    }
  };

  ctrl.$onInit = function() {
    ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
    UsersService.get(ctrl.user.id).then(function(response) {
      ctrl.depots = response.data.depots;
    });
    ctrl.ar.date = new Date();
    ctrl.salesSlips = [];
    ctrl.selectedSalesSlips = [];
    ctrl.ar.payments = [];
  };

  ctrl.findSalesSlip = function() {
    SalesSlipsService.listByDepotAndClientAndStatus(
      ctrl.ar.depot.id,
      ctrl.ar.client.id,
      ['Pending', 'Incomplete']
    ).then(function(response) {
      ctrl.salesSlips = response.data;
      console.log(response.data);
      console.log('selected sales slip size' + ctrl.selectedSalesSlips.length);
      $('#salesSlipsModal').modal('show');
    });
  };

  ctrl.selectSalesSlip = function(os) {
    var index = ctrl.customizedIndexOf(ctrl.selectedSalesSlips, os);
    if (index !== -1) {
      ctrl.selectedSalesSlips.splice(index, 1);
      ctrl.ar.payments.splice(index, 1);
    } else {
      ctrl.selectedSalesSlips.push(os);
      ctrl.ar.payments.push({
        reference: os,
        appliedAmount: 0
      });
    }
  };

  ctrl.computeTotalPayment = function() {
    ctrl.totalAmount = 0;
    ctrl.siAmount = 0;
    for (var i = 0; i < ctrl.ar.payments.length; i++) {
      if (ctrl.ar.payments[i].reference.salesOrder.type === 'DR_SI') {
        ctrl.siAmount += ctrl.ar.payments[i].appliedAmount;
      } else {
        ctrl.totalAmount += ctrl.ar.payments[i].appliedAmount;
      }
    }
  };

  ctrl.clearPayments = function() {
    ctrl.ar.payments = [];
    ctrl.selectedSalesSlips = [];
    ctrl.salesSlips = [];
  };

  ctrl.customizedIndexOf = function(list, os) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].id == os.id) return i;
    }
    return -1;
  };
  ctrl.submitForm = function() {
    console.log('submitForm: ' + JSON.stringify(ctrl.ar));
    for (var i = 0; i < ctrl.ar.payments.length; i++) {
      if (ctrl.ar.payments[i].reference.salesOrder.type === 'OS') {
        ctrl.ar.payments[i].reference.type = 'OS';
      } else if (ctrl.ar.payments[i].reference.salesOrder.type === 'DR_SI') {
        ctrl.ar.payments[i].reference.type = 'DR_SI';
      }
    }
    ctrl.onSubmit({
      $event: {
        ar: ctrl.ar
      }
    });
  };
}

angular
  .module('admin.sales')
  .controller(
    'AcknowledgementReceiptFormController',
    AcknowledgementReceiptFormController
  );
