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
    ctrl.client = event;
    var client = JSON.parse(JSON.stringify(event.client));
    console.log(client, 'EDIT');
    $('#confirmAction').modal('hide');
    $('#confirmAction').detach();
    ClientsService.update(client).then(function () {
      $state.go('client-informations');
    });
  };

  ctrl.confirmEdit = function (event) {
    ctrl.event = event;
    $('#confirmAction').appendTo('body').modal('show');
  };

  ctrl.cancel = function () {
    $('#confirmAction').modal('hide');
    $('#confirmAction').detach();
  };
}

angular
  .module('admin.maintenance')
  .controller(
    'ClientInformationEditController',
    ClientInformationEditController
  );
