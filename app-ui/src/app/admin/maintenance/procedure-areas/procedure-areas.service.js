function ProcedureAreasService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/procedure-areas');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/procedure-areas', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/procedure-areas/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/procedure-areas/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/procedure-areas/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name ProcedureAreasService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ProcedureAreasService', ProcedureAreasService);
