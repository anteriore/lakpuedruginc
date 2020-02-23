var itemTypeForm = {
  bindings: {
    itemtype: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './item-type-form.html',
  controller: 'ItemTypeFormController'
};

angular
  .module('admin.maintenance')
  .component('itemTypeForm', itemTypeForm);
