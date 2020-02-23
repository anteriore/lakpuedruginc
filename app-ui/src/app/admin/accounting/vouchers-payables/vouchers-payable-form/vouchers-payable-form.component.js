var vouchersPayableForm = {
  bindings: {
    vp: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './vouchers-payable-form.html',
  controller: 'VouchersPayableFormController'
};

angular
  .module('admin.accounting')
  .component('vouchersPayableForm', vouchersPayableForm);
