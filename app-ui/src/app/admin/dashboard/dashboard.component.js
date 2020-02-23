
var dashboard = {
  bindings: {
    dashboard: '<'
  },
  templateUrl: './dashboard.html',
  controller: 'DashboardController'
};

angular
  .module('admin.dashboard')
  .component('dashboard', dashboard)
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        parent: 'app',
        url: '/admin/dashboard',
        component: 'dashboard'
      });
  });