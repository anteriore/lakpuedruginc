function OrderSlipsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/order-slips');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/order-slips', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/order-slips/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/order-slips/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/order-slips/delete/',id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/order-slips/company/'+ companyId);
	};
	
	this.listByDepot = function(depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/order-slips/depot/'+ depotId);
	};

	this.listByDateFromAndDateToAndDepot = function(depotId, dateFrom, dateTo){
		return $http.get(globalConfig.baseUrl + '/rest/order-slips/depot/' + depotId + '/dateFrom/' + dateFrom +'/dateTo/' + dateTo);
	};
	
}

/**
 * @ngdoc service
 * @name OrderSlipsService
 * @module components.auth
 *
 */
angular.module('admin.sales').service('OrderSlipsService', OrderSlipsService);
