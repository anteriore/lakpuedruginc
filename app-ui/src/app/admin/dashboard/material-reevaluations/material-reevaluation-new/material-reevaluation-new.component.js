var materialReevaluationNew = {
  templateUrl: './material-reevaluation-new.html',
  controller: 'MaterialReevaluationNewController'
};

angular
  .module('admin.dashboard')
  .component('materialReevaluationNew', materialReevaluationNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('material-reevaluation-new', {
        parent: 'app',
        url: '/admin/dashboard/material-reevaluation/new',
        component: 'materialReevaluationNew'
      });
  });
