function InventoryMovementsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/inventory-movements');
	};

	this.save = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/inventory-movements', materialReevaluation);
	};

	this.update = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/inventory-movements/', materialReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/inventory-movements/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/inventory-movements/company/' + companyId);
	};
}

/**
 * @ngdoc service
 * @name InventoryMovementService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('InventoryMovementsService', InventoryMovementsService);
