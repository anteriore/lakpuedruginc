var vendorForm = {
  bindings: {
    vendor: '=',
    company: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './vendor-form.html',
  controller: 'VendorFormController'
};

angular
  .module('admin.maintenance')
  .component('vendorForm', vendorForm);
