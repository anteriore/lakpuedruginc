
function ChequePrintingsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/cheque-printings');
	};

	this.save = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/cheque-printings', receivingReceipt);
	};

	this.update = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/cheque-printings/', receivingReceipt);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/cheque-printings/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/cheque-printings/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/cheque-printings/delete/',id);
	};
	
	this.approve = function(vpId, userId){
		return $http.post(globalConfig.baseUrl + '/rest/cheque-printings/approve/' + vpId + '/user/' + userId);
	};
	
	this.listByCompanyAndStatus = function(companyId, status) {
		return $http.get(globalConfig.baseUrl + '/rest/cheque-printings/company/' + companyId + '/status/'+ status);
	};
}

/**
 * @ngdoc service
 * @name ChequePrintingsService
 * @module components.auth
 *
 */

angular.module('admin.accounting').service('ChequePrintingsService', ChequePrintingsService);
