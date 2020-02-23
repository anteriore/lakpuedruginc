
var accountSummaryReport = {
  templateUrl: './account-summary-report.html',
  controller: 'AccountSummaryReportController'
};

angular
  .module('admin.dashboard')
  .component('accountSummaryReport', accountSummaryReport)
  .config(function ($stateProvider) {
    $stateProvider
      .state('account-summary-reports', {
        parent: 'app',
        url: '/admin/dashboard/account-summary-report',
        component: 'accountSummaryReport'
      });
  });