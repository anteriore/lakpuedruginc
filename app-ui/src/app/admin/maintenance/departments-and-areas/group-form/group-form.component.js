var groupForm = {
  bindings: {
    group: '=',
    company: '<',
    button: '@',
    message: '@',
    onSubmit: '&',
  },
  templateUrl: './group-form.html',
  controller: 'GroupFormController',
};

angular.module('admin.maintenance').component('groupForm', groupForm);
