function VendorEditController(
  $state,
  $stateParams,
  VendorsService,
  $rootScope
) {
  var ctrl = this;
  ctrl.vendor = {};
  ctrl.$onInit = function () {
    ctrl.error = null;

    console.log('vendorId: ' + JSON.stringify($stateParams.vendorId));

    VendorsService.get($stateParams.vendorId).then(function (response) {
      ctrl.vendor = response.data;
    });
  };
  ctrl.edit = function (event) {
    console.log('VendorEditController edit');
    var vendor = JSON.parse(JSON.stringify(event.vendor));
    $('#confirmAction').modal('hide');
    $('#confirmAction').detach();
    VendorsService.update(vendor).then(function () {
      $state.go('vendors');
    });
  };

  ctrl.confirmEdit = function (event) {
    ctrl.event = event;
    $('#confirmAction').appendTo('body').modal('show');
  };

  ctrl.cancel = function () {
    $('#confirmAction').modal('hide');
  };
}

angular
  .module('admin.maintenance')
  .controller('VendorEditController', VendorEditController);
