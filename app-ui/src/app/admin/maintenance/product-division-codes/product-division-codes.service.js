function ProductDivisionCodesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/product-division-codes');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/product-division-codes', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/product-division-codes/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/product-division-codes/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/product-division-codes/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name ProductDivisionCodesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ProductDivisionCodesService', ProductDivisionCodesService);
