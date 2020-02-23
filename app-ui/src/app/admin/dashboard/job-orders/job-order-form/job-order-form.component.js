var jobOrderForm = {
  bindings: {
    jo: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './job-order-form.html',
  controller: 'JobOrderFormController'
};

angular
  .module('admin.dashboard')
  .component('jobOrderForm', jobOrderForm);
