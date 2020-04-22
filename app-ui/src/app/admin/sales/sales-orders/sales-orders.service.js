function SalesOrdersService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/sales-orders');
	};

	this.save = function(purchaseRequest) {
		console.log('inside save function')
		return $http.post(globalConfig.baseUrl + '/rest/sales-orders', purchaseRequest);
	};

	this.update = function(purchaseRequest) {
		return $http.post(globalConfig.baseUrl + '/rest/sales-orders/', purchaseRequest);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-orders/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-orders/company/' + companyId);
	};
	
	this.listByDepot = function(depotId) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-orders/depot/' + depotId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/sales-orders/delete/',id);
	};
	
	this.approve = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/sales-orders/approve/' + id);
	};
	
	this.reject = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/sales-orders/reject/' + id);
	};
	
	this.getLatestCancelledReqs = function(soId){
		return $http.get(globalConfig.baseUrl + '/rest/sales-orders/cancelled-reqs/' + soId);
	};
	
	this.cancelRequestedProduct = function(requestedItem){
		return $http.post(globalConfig.baseUrl + '/api/sales-order-products/cancel', requestedItem);
	};
	
	this.listNotCompletedByCompanyAndDepot = function(companyId, depotId,  type) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-orders/company/' + companyId + '/depot/'+depotId+'/type/' + type);
	};
	
	this.listSoProductsBySoNumber = function(soId) {
		return $http.get(globalConfig.baseUrl + '/api/sales-order-products/so/' + soId);
	};
	
	this.getReservedQuantityOfFg = function (fgId, depotId) {
		return $http.get(globalConfig.baseUrl + '/api/sales-order-products/fg/' + fgId + '/depot/'+depotId+'/reserved-quantity');
	};
	
	this.getTotalAmountAndQuantity = function (depotId, dateFrom, dateTo, salesRepId){
		return $http.get(globalConfig.baseUrl + '/rest/sales-orders/general-sales-report/depot/' + depotId + '/start/' + dateFrom + '/end/' + dateTo + '/sales-rep/' + salesRepId);
	};
}

/**
 * @ngdoc service
 * @name SalesOrdersService
 * @module components.auth
 * 
 */
angular.module('admin.sales').service('SalesOrdersService', SalesOrdersService);