var depotForm = {
  bindings: {
    depot: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './depot-form.html',
  controller: 'DepotFormController'
};

angular
  .module('admin.maintenance')
  .component('depotForm', depotForm);
