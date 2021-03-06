
function ClientFormController($state, ClientsService) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.client) {
      ctrl.client = angular.copy(ctrl.client);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.client));
    ctrl.onSubmit({
      $event: {
        client: ctrl.client
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('ClientFormController', ClientFormController);
