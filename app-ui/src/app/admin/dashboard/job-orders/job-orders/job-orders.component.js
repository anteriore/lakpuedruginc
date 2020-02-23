
var joborder = {
  templateUrl: './job-orders.html',
  controller: 'JobOrdersController'
};

angular
  .module('admin.dashboard')
  .component('joborder', joborder)
  .config(function ($stateProvider) {
    $stateProvider
      .state('job-order', {
        parent: 'app',
        url: '/admin/dashboard/job-order',
        component: 'joborder'
      });
  });