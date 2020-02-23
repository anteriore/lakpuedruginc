
function AccountTitleFormController($state, AccountTitlesService) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.accounttitle) {
      ctrl.accounttitle = angular.copy(ctrl.accounttitle);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm: ' + JSON.stringify(ctrl.accounttitle));
    ctrl.onSubmit({
      $event: {
        accounttitle: ctrl.accounttitle
      }
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('AccountTitleFormController', AccountTitleFormController);
