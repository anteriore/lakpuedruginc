function SalesReportsService($http, globalConfig) {

	this.itemSalesReport = function(userAssignedDepotId, startDate, endDate, itemId) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-reports/item-sales-report/depot/'+userAssignedDepotId+'/start/' + startDate + '/end/' + endDate + '/item/' + itemId);
	};
	
	this.itemSalesReportByCategory = function (userAssignedDepotId, startDate, endDate, categoryId, divisionId) {
		return $http.get(globalConfig.baseUrl + '/rest/sales-reports/item-sales-report/depot/'+userAssignedDepotId+'/start/' + startDate + '/end/' + endDate + '/category/' + categoryId + '/division/' +divisionId);

	};

}

/**
 * @ngdoc service
 * @name SalesReportsService
 * @module components.auth
 * 
 */
angular.module('admin.dashboard').service('SalesReportsService', SalesReportsService);