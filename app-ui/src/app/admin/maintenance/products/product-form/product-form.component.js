var productForm = {
  bindings: {
    product: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './product-form.html',
  controller: 'ProductFormController'
};

angular
  .module('admin.maintenance')
  .component('productForm', productForm);
