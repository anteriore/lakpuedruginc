var purchaseOrderForm = {
  bindings: {
    po: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './purchase-order-form.html',
  controller: 'PurchaseOrderFormController'
};

angular
  .module('admin.purchasing')
  .component('purchaseOrderForm', purchaseOrderForm);
