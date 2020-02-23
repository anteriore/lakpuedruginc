var chequePrintingForm = {
  bindings: {
    cp: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './cheque-printing-form.html',
  controller: 'ChequePrintingFormController'
};

angular
  .module('admin.accounting')
  .component('chequePrintingForm', chequePrintingForm);
