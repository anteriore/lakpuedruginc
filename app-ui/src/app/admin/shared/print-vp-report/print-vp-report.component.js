var printVpReport = {
	templateUrl : './print-vp-report.html',
	controller : 'PrintVpReportController'
};

angular.module('admin.shared')
.component('printVpReport', printVpReport)
.config(function ($stateProvider) {
    $stateProvider
      .state('print-vp-report', {
        url: '/admin/shared/print-vp-report/start/:startDate/end/:endDate',
		component: 'printVpReport',
		params: {
			startDate: null,
			endDate: null
		}
	  });
	});
