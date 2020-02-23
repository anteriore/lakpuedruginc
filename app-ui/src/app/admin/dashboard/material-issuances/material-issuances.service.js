function MaterialIssuancesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/material-issuances');
	};

	this.save = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/material-issuances', materialReevaluation);
	};

	this.update = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/material-issuances/', materialReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/material-issuances/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/material-issuances/company/' + companyId);
	};
	
	this.listByStatus = function (status) {
		return $http.get(globalConfig.baseUrl + '/rest/material-issuances/status/' + status);
	};
}

/**
 * @ngdoc service
 * @name MaterialIssuancesService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('MaterialIssuancesService', MaterialIssuancesService);
