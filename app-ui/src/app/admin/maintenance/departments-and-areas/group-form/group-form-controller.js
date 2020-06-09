function GroupFormController($state, GroupService) {
  var ctrl = this;

  ctrl.$onChanges = function (changes) {
    if (changes.group) {
      ctrl.group = angular.copy(ctrl.group);
    }
  };

  ctrl.submitForm = function () {
    console.log('submitForm:1 ' + JSON.stringify(ctrl.group));
    ctrl.onSubmit({
      $event: {
        group: ctrl.group,
      },
    });
  };
}

angular
  .module('admin.maintenance')
  .controller('GroupFormController', GroupFormController);
