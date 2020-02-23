
function ChequeDisbursementsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/cheque-disbursements');
	};

	this.save = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/cheque-disbursements', receivingReceipt);
	};

	this.update = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/cheque-disbursements/', receivingReceipt);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/cheque-disbursements/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/cheque-disbursements/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/cheque-disbursements/delete/',id);
	};
	
}

/**
 * @ngdoc service
 * @name ChequeDisbursementsService
 * @module components.auth
 *
 */

angular.module('admin.accounting').service('ChequeDisbursementsService', ChequeDisbursementsService);
