function EngineeringInventoryService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/engineering-inventory');
	};

	this.save = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/engineering-inventory', materialReevaluation);
	};

	this.update = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/engineering-inventory/', materialReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/engineering-inventory/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/engineering-inventory/company/' + companyId);
	};
	
	this.getItemByControlNumber = function(controlNumber){
		return $http.get(globalConfig.baseUrl + '/rest/engineering-inventory/item/control-number/' + controlNumber);
	};
	
	this.getStockQuantityOfItem = function(itemId, companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/engineering-inventory/company/'+companyId+'/stock/' + itemId);
	};
	
	this.listEngineeringInventoryView = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/engineering-inventory/company/' + companyId + '/view');
	};
	
	this.listByCompanyAndItem = function(companyId, itemId){
		return $http.get(globalConfig.baseUrl + '/rest/engineering-inventory/company/' + companyId + '/item/' + itemId);
	};
	
	this.listByRecipeItemsOnEngineeringInventory = function(companyId, recipeId) {
		return $http.get(globalConfig.baseUrl + '/rest/engineering-inventory/company/' + companyId + '/recipe/' + recipeId);
	}
}

/**
 * @ngdoc service
 * @name EngineeringInventoryService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('EngineeringInventoryService', EngineeringInventoryService);
