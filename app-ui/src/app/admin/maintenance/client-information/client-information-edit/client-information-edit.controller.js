function ClientInformationEditController(
  $state,
  $stateParams,
  ClientsService,
  $rootScope
) {
  var ctrl = this;
  ctrl.client = {};
  ctrl.$onInit = function () {
    ctrl.error = null;

    console.log('clientId: ' + JSON.stringify($stateParams.clientId));

    ClientsService.get($stateParams.clientId).then(function (response) {
      ctrl.client = response.data;
    });
  };

  ctrl.edit = function (event) {
    var client = JSON.parse(JSON.stringify(event.client));
    $('#confirmAction').modal('hide');
    ClientsService.update(client).then(function () {
      $state.go('client-informations');
    });
  };

  ctrl.confirmEdit = function (event) {
    console.log(event);
    ctrl.client = event;
    $('#confirmAction').modal('show');
    $('#confirmAction').appendTo('body');
  };

  ctrl.cancel = function () {
    $('#confirmAction').modal('hide');
  };
}

angular
  .module('admin.maintenance')
  .controller(
    'ClientInformationEditController',
    ClientInformationEditController
  );
