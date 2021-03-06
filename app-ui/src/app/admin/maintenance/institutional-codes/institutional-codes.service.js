function InstitutionalCodesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/institutional-codes');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/institutional-codes', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/institutional-codes/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/institutional-codes/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/institutional-codes/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name InstitutionalCodesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('InstitutionalCodesService', InstitutionalCodesService);
