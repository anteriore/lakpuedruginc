var procedureAreaForm = {
  bindings: {
    procedurearea: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './procedure-area-form.html',
  controller: 'ProcedureAreaFormController'
};

angular
  .module('admin.maintenance')
  .component('procedureAreaForm', procedureAreaForm);
