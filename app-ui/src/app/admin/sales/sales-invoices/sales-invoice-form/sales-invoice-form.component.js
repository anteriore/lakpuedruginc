var salesInvoiceForm = {
  bindings: {
    si: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './sales-invoice-form.html',
  controller: 'SalesInvoiceFormController'
};

angular
  .module('admin.sales')
  .component('salesInvoiceForm', salesInvoiceForm);
