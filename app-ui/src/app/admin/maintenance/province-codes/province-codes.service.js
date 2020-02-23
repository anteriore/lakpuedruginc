function ProvinceCodesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/province-codes');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/province-codes', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/province-codes/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/province-codes/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/province-codes/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name ProvinceCodesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ProvinceCodesService', ProvinceCodesService);
