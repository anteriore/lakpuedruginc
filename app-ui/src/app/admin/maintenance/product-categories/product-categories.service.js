function ProductCategoriesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/product-categories');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/product-categories', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/product-categories/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/product-categories/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/product-categories/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name ProductCategoriesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ProductCategoriesService', ProductCategoriesService);
