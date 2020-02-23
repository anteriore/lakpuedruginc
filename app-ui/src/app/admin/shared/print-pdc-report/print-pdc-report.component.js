var printPdcReport = {
	templateUrl : './print-pdc-report.html',
	controller : 'PrintPdcReportController'
};

angular.module('admin.shared')
.component('printPdcReport', printPdcReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-pdc-report', {
        url: '/admin/shared/print-pdc-report/start/:startDate/end/:endDate',
		component: 'printPdcReport',
		params: {
			startDate: null,
			endDate: null
		}
	  });
	});
