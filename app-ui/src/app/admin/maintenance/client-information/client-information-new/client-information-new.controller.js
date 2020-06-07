function ClientInformationNewController($state, ClientsService, $rootScope) {
  var ctrl = this;

  ctrl.$onInit = function () {
    ctrl.error = null;
    ctrl.user = JSON.parse(window.localStorage.getItem('currentUser'));
    ctrl.client = {
      company: $rootScope.selectedCompany,
      clientReferencesList: [],
    };
  };

  ctrl.confirmCreate = function (event) {
    ctrl.event = event;
    $('#confirmAction').appendTo('body').modal('show');
  };

  ctrl.addClient = function (event) {
    ctrl.client = event;
    var client = JSON.parse(JSON.stringify(event.client));
    console.log(client, 'add');
    $('#confirmAction').modal('hide');
    $('#confirmAction').detach();
    ClientsService.save(client).then(function () {
      $state.go('client-informations');
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('ClientInformationNewController', ClientInformationNewController);
