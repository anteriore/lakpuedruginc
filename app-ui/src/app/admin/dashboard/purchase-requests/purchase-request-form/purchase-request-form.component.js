var purchaseRequestForm = {
  bindings: {
    prf: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './purchase-request-form.html',
  controller: 'PurchaseRequestFormController'
};

angular
  .module('admin.dashboard')
  .component('purchaseRequestForm', purchaseRequestForm);
