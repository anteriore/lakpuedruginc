var pdcVoucherForm = {
  bindings: {
    pdc: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './pdc-voucher-form.html',
  controller: 'PdcVoucherFormController'
};

angular
  .module('admin.accounting')
  .component('pdcVoucherForm', pdcVoucherForm);
