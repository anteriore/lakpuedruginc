var clientInformationForm = {
  bindings: {
    client: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './client-information-form.html',
  controller: 'ClientInformationFormController'
};

angular
  .module('admin.maintenance')
  .component('clientInformationForm', clientInformationForm);
