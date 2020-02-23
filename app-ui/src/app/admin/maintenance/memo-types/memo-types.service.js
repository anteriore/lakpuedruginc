function MemoTypesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/memo-types');
	};

	this.paginate = function(itemsPerPage, offset) {
		return $http.get(globalConfig.baseUrl + '/rest/memo-types/paginate/' + itemsPerPage + '/' + offset);
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/memo-types', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/memo-types/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/memo-types/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/memo-types/delete/',id);
	};
	
	this.listByType = function(type){
		return $http.get(globalConfig.baseUrl + '/rest/memo-types/type/' +type);
	};
}

/**
 * @ngdoc service
 * @name MemoTypesService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('MemoTypesService', MemoTypesService);
