var acknowledgementReceiptForm = {
  bindings: {
    ar: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './acknowledgement-receipt-form.html',
  controller: 'AcknowledgementReceiptFormController'
};

angular
  .module('admin.sales')
  .component('acknowledgementReceiptForm', acknowledgementReceiptForm);
