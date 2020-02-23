function ProductInventoryService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory');
	};

	this.save = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/product-inventory', materialReevaluation);
	};

	this.update = function(materialReevaluation) {
		return $http.post(globalConfig.baseUrl + '/rest/product-inventory/', materialReevaluation);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/company/' + companyId);
	};
	
	this.listByDepot = function(depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/depot/' + depotId);
	};
	
	this.listByFinishedGoodAndDepot = function(finishedGoodId, depotId){
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/depot/' + depotId +'/finished-good/' + finishedGoodId);
	};
	
	this.listProductInventoryView = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/company/' + companyId + '/view');
	};
	
	this.listByCompanyAndFinishedGood = function(companyId, finishedGoodId){
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/company/' + companyId + '/finished-good/' + finishedGoodId);
	};
	
	this.listProductInventoryDepotView = function(companyId, depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/company/' + companyId + '/depot/'+depotId+'/view');
	};
	
	this.listByDepotAndFinishedGood = function(depotId, finishedGoodId){
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/depot/' + depotId + '/finished-good/' + finishedGoodId);
	};
	
	this.listFinishedGoodView = function(companyId){
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/company/'+ companyId +'/view/fg-modal');
	};
	
	this.listProductInventoryDepotReport = function(companyId, depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/product-inventory/company/' + companyId + '/depot/'+depotId+'/report');
	};
	
}

/**
 * @ngdoc service
 * @name ProductInventoryService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('ProductInventoryService', ProductInventoryService);
