function ClientsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/clients');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/clients', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/clients/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/clients/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/clients/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/clients/delete/',id);
	};
	
	this.getClients = function(companyId, salesRepId){
		return $http.get(globalConfig.baseUrl + '/rest/clients/report/company/' + companyId + '/sales-rep/' + salesRepId);
	};
	this.paginateByCompany = function(companyId, itemsPerPage, offset) {
		return $http.get(globalConfig.baseUrl + '/rest/clients/company/'+companyId+'/paginate/' + itemsPerPage + '/' + offset);
	};
}

/**
 * @ngdoc service
 * @name ClientsService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ClientsService', ClientsService);
