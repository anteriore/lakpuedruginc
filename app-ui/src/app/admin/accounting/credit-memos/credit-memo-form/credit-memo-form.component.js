var creditMemoForm = {
  bindings: {
    cm: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './credit-memo-form.html',
  controller: 'CreditMemoFormController'
};

angular
  .module('admin.accounting')
  .component('creditMemoForm', creditMemoForm);
