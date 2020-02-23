var orderSlipForm = {
  bindings: {
    os: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './order-slip-form.html',
  controller: 'OrderSlipFormController'
};

angular
  .module('admin.sales')
  .component('orderSlipForm', orderSlipForm);
