function PurchaseRequestsService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-requests');
	};

	this.save = function(purchaseRequest) {
		return $http.post(globalConfig.baseUrl + '/rest/purchase-requests', purchaseRequest);
	};

	this.update = function(purchaseRequest) {
		return $http.post(globalConfig.baseUrl + '/rest/purchase-requests/', purchaseRequest);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-requests/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/purchase-requests/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/purchase-requests/delete/',id);
	};
	
	this.getByPrfNumberAndPurchaseOrder= function(prfNumber,po){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-requests/number/' + prfNumber + '/po/'+po);
	};
	
	this.getPrfQuantityOfItem = function(itemId, companyId){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-requests/company/' + companyId + '/stock/' + itemId);
	};
	
	this.approve = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/purchase-requests/approve/' + id);
	};
	
	this.reject = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/purchase-requests/reject/' + id);
	};
	
	this.getRequestedItemsByCompany = function(companyId){
		return $http.get(globalConfig.baseUrl + '/api/requested-items/company/' + companyId);
	};
	
	this.cancelRequestedItem = function(requestedItem){
		return $http.post(globalConfig.baseUrl + '/api/requested-items/cancel', requestedItem);
	};
	
	this.getLatestCancelledReqs = function(prfId){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-requests/cancelled-reqs/' + prfId);
	};
	
	this.getRequestedItemsByCompanyAndType = function(companyId, type){
		return $http.get(globalConfig.baseUrl + '/api/requested-items/company/' + companyId + '/type/'+type);
	};
	
	this.listByCompanyAndDepartment = function(companyId, department){
		return $http.get(globalConfig.baseUrl + '/rest/purchase-requests/company/' + companyId + '/department/'+department);
	};
	
	
}

/**
 * @ngdoc service
 * @name PurchaseRequestsService
 * @module components.auth
 * 
 */
angular.module('admin.dashboard').service('PurchaseRequestsService', PurchaseRequestsService);
