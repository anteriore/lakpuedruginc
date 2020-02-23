
var salesReports = {
  templateUrl: './sales-reports.html',
  controller: 'SalesReportsController'
};

angular
  .module('admin.dashboard')
  .component('salesReports', salesReports)
  .config(function ($stateProvider) {
    $stateProvider
      .state('sales-reports', {
        parent: 'app',
        url: '/admin/dashboard/sales-reports',
        component: 'salesReports'
      });
  });