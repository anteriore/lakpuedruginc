var printJvReport = {
	templateUrl : './print-jv-report.html',
	controller : 'PrintJvReportController'
};

angular.module('admin.shared')
.component('printJvReport', printJvReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-jv-report', {
        url: '/admin/shared/print-jv-report/start/:startDate/end/:endDate',
		component: 'printJvReport',
		params: {
			startDate: null,
			endDate: null
		}
	  });
	});
