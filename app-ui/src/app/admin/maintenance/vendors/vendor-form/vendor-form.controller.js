function VendorFormController(
  $state,
  AreasService,
  GroupService,
  DepartmentsService,
  _
) {
  var ctrl = this;

  var currentUser = localStorage.getItem('currentUser');
  if (currentUser != null) {
    ctrl.currentUser = JSON.parse(currentUser);
  }

  ctrl.$onInit = function () {
    AreasService.list().then(function (response) {
      ctrl.areas = response.data;
    });
    GroupService.list().then(function (response) {
      ctrl.groups = response.data;
    });

    DepartmentsService.list().then(function (response) {
      ctrl.departments = response.data;
    });
  };

  ctrl.$onChanges = function (changes) {
    if (changes.vendor) {
      ctrl.vendor = angular.copy(ctrl.vendor);
    }
  };

  ctrl.isActive = [
    { value: true, name: 'Active' },
    { value: false, name: 'Not Active' },
  ];

  ctrl.type = [
    { value: 'V', name: 'Vendor Only' },
    { value: 'P', name: 'Payee Only' },
    { value: 'B', name: 'Both' },
  ];

  ctrl.submitForm = function () {
    console.log(ctrl.vendor);
    ctrl.onSubmit({
      $event: {
        vendor: ctrl.vendor,
      },
    });
  };

  ctrl.cancelEdit = function () {
    $('#confirmEditAction').modal('hide');
  };
}

angular
  .module('admin.maintenance')
  .controller('VendorFormController', VendorFormController);
