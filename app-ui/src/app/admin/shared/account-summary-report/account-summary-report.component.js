var printAccountSummaryReport = {
	templateUrl : './print-account-summary-report.html',
	controller : 'PrintAccountSummaryReportController'
};

angular.module('admin.shared')
.component('printAccountSummaryReport', printAccountSummaryReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-account-summary-report', {
        url: '/admin/shared/print-account-summary-report/:type/start/:startDate/end/:endDate',
		component: 'printAccountSummaryReport',
		params: {
			type:null,
			startDate: null,
			endDate: null
		}
	  });
	});
