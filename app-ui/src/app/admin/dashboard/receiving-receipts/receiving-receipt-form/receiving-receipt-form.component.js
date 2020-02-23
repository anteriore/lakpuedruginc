var receivingReceiptForm = {
  bindings: {
    rr: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './receiving-receipt-form.html',
  controller: 'ReceivingReceiptFormController'
};

angular
  .module('admin.dashboard')
  .component('receivingReceiptForm', receivingReceiptForm);
