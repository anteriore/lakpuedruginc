function DeliveryReceiptsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/delivery-receipts');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/delivery-receipts', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/delivery-receipts/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/delivery-receipts/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/delivery-receipts/delete/',id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/delivery-receipts/company/'+ companyId);
	};
}

/**
 * @ngdoc service
 * @name DeliveryReceiptsService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('DeliveryReceiptsService', DeliveryReceiptsService);
