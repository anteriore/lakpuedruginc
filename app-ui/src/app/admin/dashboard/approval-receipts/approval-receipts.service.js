
function ApprovedReceiptsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/approved-receipts');
	};

	this.save = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/approved-receipts', receivingReceipt);
	};

	this.update = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/approved-receipts/', receivingReceipt);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/approved-receipts/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/approved-receipts/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/approved-receipts/delete/',id);
	};
	
	this.getByArNumber = function(arNumber) {
		return $http.get(globalConfig.baseUrl + '/rest/approved-receipts/number/' + arNumber);
	};
	
}

/**
 * @ngdoc service
 * @name ApprovedReceiptsService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('ApprovedReceiptsService', ApprovedReceiptsService);
