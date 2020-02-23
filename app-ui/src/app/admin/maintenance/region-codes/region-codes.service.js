function RegionCodesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/region-codes');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/region-codes', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/region-codes/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/region-codes/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/region-codes/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name RegionCodesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('RegionCodesService', RegionCodesService);
