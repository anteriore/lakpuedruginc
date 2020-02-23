var salesOrderForm = {
  bindings: {
    so: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './sales-order-form.html',
  controller: 'SalesOrderFormController'
};

angular
  .module('admin.sales')
  .component('salesOrderForm', salesOrderForm);
