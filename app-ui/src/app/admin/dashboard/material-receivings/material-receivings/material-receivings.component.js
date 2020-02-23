
var materialreceiving = {
  templateUrl: './material-receivings.html',
  controller: 'MaterialReceivingsController'
};

angular
  .module('admin.dashboard')
  .component('materialreceiving', materialreceiving)
  .config(function ($stateProvider) {
    $stateProvider
      .state('materialreceiving', {
        parent: 'app',
        url: '/admin/dashboard/material-receiving',
        component: 'materialreceiving'
      });
  });