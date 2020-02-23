var areaForm = {
  bindings: {
    area: '=',
    company: '<',
    button: '@',
    message: '@',
    onSubmit: '&'
  },
  templateUrl: './area-form.html',
  controller: 'AreaFormController'
};

angular
  .module('admin.maintenance')
  .component('areaForm', areaForm);
