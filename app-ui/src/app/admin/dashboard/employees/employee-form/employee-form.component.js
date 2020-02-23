var employeeForm = {
  bindings: {
    employee: '=',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './employee-form.html',
  controller: 'EmployeeFormController'
};

angular
  .module('admin.dashboard')
  .component('employeeForm', employeeForm);
