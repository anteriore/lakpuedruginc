function AccountSummaryReportsService($http, globalConfig) {
	
	this.getJVAccountSummaryReport = function (companyId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/account-summary-reports/jv/company/' + companyId + '/start/' + startDate + '/end/' + endDate);
	}
	
	this.getPJVAccountSummaryReport = function (companyId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/account-summary-reports/pjv/company/' + companyId + '/start/' + startDate + '/end/' + endDate);
	}
	
	this.getCDVAccountSummaryReport = function (companyId, startDate, endDate) {
		return $http.get(globalConfig.baseUrl + '/rest/account-summary-reports/cdv/company/' + companyId + '/start/' + startDate + '/end/' + endDate);
	}
	
	this.getVPAccountSummaryReport = function (companyId, startDate, endDate) {
		return $http.get(globalConfig.baseUrl + '/rest/account-summary-reports/vp/company/' + companyId + '/start/' + startDate + '/end/' + endDate);
	}
}

/**
 * @ngdoc service
 * @name AccountSummaryReportsService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('AccountSummaryReportsService', AccountSummaryReportsService);
