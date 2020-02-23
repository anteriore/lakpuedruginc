var pdcDisbursementForm = {
  bindings: {
    pdc: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './pdc-disbursement-form.html',
  controller: 'PdcDisbursementFormController'
};

angular
  .module('admin.accounting')
  .component('pdcDisbursementForm', pdcDisbursementForm);
