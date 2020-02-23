var productReceivingForm = {
  bindings: {
    prs: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './product-receiving-form.html',
  controller: 'ProductReceivingFormController'
};

angular
  .module('admin.dashboard')
  .component('productReceivingForm', productReceivingForm);
