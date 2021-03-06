function ItemTypesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/item-types');
	};

	this.save = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/item-types', itemType);
	};

	this.update = function(itemType) {
		return $http.post(globalConfig.baseUrl + '/rest/item-types/', itemType);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/item-types/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/item-types/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name ItemTypesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ItemTypesService', ItemTypesService);
