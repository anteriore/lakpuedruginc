var materialIssuanceNew = {
  templateUrl: './material-issuance-new.html',
  controller: 'MaterialIssuanceNewController'
};

angular
  .module('admin.dashboard')
  .component('materialIssuanceNew', materialIssuanceNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('material-issuance-new', {
        parent: 'app',
        url: '/admin/dashboard/material-issuance/new',
        component: 'materialIssuanceNew'
      });
  });
