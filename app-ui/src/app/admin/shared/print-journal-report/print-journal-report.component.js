var printJournalReport = {
	templateUrl : './print-journal-report.html',
	controller : 'PrintJournalReportController'
};

angular.module('admin.shared')
.component('printJournalReport', printJournalReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-journal-report', {
        url: '/admin/shared/print-journal-report/start/:startDate/end/:endDate',
		component: 'printJournalReport',
		params: {
			startDate: null,
			endDate: null
		}
	  });
	});
