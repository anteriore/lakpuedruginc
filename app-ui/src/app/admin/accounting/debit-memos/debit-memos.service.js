function DebitMemosService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/debit-memos');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/debit-memos', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/debit-memos/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/debit-memos/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/debit-memos/delete/',id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/debit-memos/company/'+ companyId);
	};
	
	this.listByDepot = function(depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/debit-memos/depot/'+ depotId);
	};
	
}

/**
 * @ngdoc service
 * @name DebitMemosService
 * @module components.auth
 *
 */
angular.module('admin.accounting').service('DebitMemosService', DebitMemosService);
