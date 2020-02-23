function ClassificationsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/classifications');
	};

	this.save = function(classification) {
		return $http.post(globalConfig.baseUrl + '/rest/classifications', classification);
	};

	this.update = function(classification) {
		return $http.post(globalConfig.baseUrl + '/rest/classifications/', classification);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/classifications/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/classifications/delete/',id);
	};
	
	this.listTypes = function(){
		return $http.get(globalConfig.baseUrl + '/rest/classifications/types');
	};
}

/**
 * @ngdoc service
 * @name ClassificationsService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('ClassificationsService', ClassificationsService);
