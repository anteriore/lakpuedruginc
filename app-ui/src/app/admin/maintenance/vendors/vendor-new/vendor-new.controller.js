function VendorNewController($state, VendorsService, $rootScope) {
  var ctrl = this;

  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
    ctrl.vendor = {
      company: $rootScope.selectedCompany,
    };
  };

  ctrl.confirmCreate = function (event) {
    ctrl.event = event;
    $('#confirmAction').appendTo('body').modal('show');
  };

  ctrl.cancel = function () {
    $('#confirmAction').modal('hide');
  };

  ctrl.addVendor = function (event) {
    $('#confirmAction').modal('hide');
    $('#confirmAction').detach();

    VendorsService.save(event.vendor).then(function (response) {
      console.log('createClient ' + JSON.stringify(response.data));
      $state.go('vendors');
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('VendorNewController', VendorNewController);
