function ProductIssuancesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/product-issuances');
	};

	this.save = function(productReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/product-issuances', productReevaluation);
	};

	this.update = function(productReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/product-issuances/', productReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/product-issuances/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/product-issuances/company/' + companyId);
	};
	
	this.listByStatusAndDepot = function (status, depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/product-issuances/status/' + status + '/depot/' + depotId);
	};
}

/**
 * @ngdoc service
 * @name ProductIssuancesService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('ProductIssuancesService', ProductIssuancesService);
