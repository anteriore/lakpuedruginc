var printPjvReport = {
	templateUrl : './print-pjv-report.html',
	controller : 'PrintPjvReportController'
};

angular.module('admin.shared')
.component('printPjvReport', printPjvReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-pjv-report', {
        url: '/admin/shared/print-pjv-report/start/:startDate/end/:endDate',
		component: 'printPjvReport',
		params: {
			startDate: null,
			endDate: null
		}
	  });
	});
