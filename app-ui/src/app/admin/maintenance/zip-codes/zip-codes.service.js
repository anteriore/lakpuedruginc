function ZipCodesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/zip-codes');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/zip-codes', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/zip-codes/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/zip-codes/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/zip-codes/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name ZipCodesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ZipCodesService', ZipCodesService);
