var materialIssuanceForm = {
  bindings: {
    mis: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './material-issuance-form.html',
  controller: 'MaterialIssuanceFormController'
};

angular
  .module('admin.dashboard')
  .component('materialIssuanceForm', materialIssuanceForm);
