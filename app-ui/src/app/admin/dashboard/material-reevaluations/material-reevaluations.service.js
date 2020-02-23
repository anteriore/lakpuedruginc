function MaterialReevaluationsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/material-reevaluations');
	};

	this.save = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/material-reevaluations', materialReevaluation);
	};

	this.update = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/material-reevaluations/', materialReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/material-reevaluations/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/material-reevaluations/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/material-reevaluations/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name MaterialReevaluationsService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('MaterialReevaluationsService', MaterialReevaluationsService);
