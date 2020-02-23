var receivingReceiptTollingForm = {
  bindings: {
    rr: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './receiving-receipt-tolling-form.html',
  controller: 'ReceivingReceiptTollingFormController'
};

angular
  .module('admin.dashboard')
  .component('receivingReceiptTollingForm', receivingReceiptTollingForm);
