var materialReceivingNew = {
  templateUrl: './material-receiving-new.html',
  controller: 'MaterialReceivingNewController'
};

angular
  .module('admin.dashboard')
  .component('materialReceivingNew', materialReceivingNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('material-receiving-new', {
        parent: 'app',
        url: '/admin/dashboard/material-receiving/new',
        component: 'materialReceivingNew'
      });
  });
