function PurchaseOrdersService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-orders');
	};

	this.save = function(purchaseOrder) {
		return $http.post(globalConfig.baseUrl + '/rest/purchase-orders', purchaseOrder);
	};

	this.update = function(purchaseOrder) {
		return $http.post(globalConfig.baseUrl + '/rest/purchase-orders/', purchaseOrder);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-orders/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-orders/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/purchase-orders/delete/',id);
	};
	
	this.getPurchaseOrderQuantity = function(companyId, itemId){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-orders/company/' + companyId + '/stock/' + itemId);
	};
	
	this.listNotCompletedByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-orders/company/' + companyId + '/not-completed');
	};
	
	this.getByNumber = function(number){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-orders/number/' + number);
	};
}

/**
 * @ngdoc service
 * @name PurchaseOrdersService
 * @module components.auth
 *
 */
angular.module('admin.purchasing').service('PurchaseOrdersService', PurchaseOrdersService);
