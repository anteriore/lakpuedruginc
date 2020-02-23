
function VouchersService($http, globalConfig) {

	this.listNewVouchersByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/vouchers/company/' + companyId + '/new-vouchers');
	};
	
	this.listNewVouchersByCompanyAndStatus = function(companyId, status) {
		return $http.get(globalConfig.baseUrl + '/rest/vouchers/company/' + companyId + '/status/'+status+'/new-vouchers');
	};

	
	
}

/**
 * @ngdoc service
 * @name VouchersService
 * @module components.auth
 *
 */

angular.module('admin.dashboard').service('VouchersService', VouchersService);
