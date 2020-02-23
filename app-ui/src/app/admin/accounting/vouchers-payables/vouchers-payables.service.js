
function VouchersPayablesService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/vouchers-payables');
	};

	this.save = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/vouchers-payables', receivingReceipt);
	};

	this.update = function(receivingReceipt) {
		return $http.post(globalConfig.baseUrl + '/rest/vouchers-payables/', receivingReceipt);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/vouchers-payables/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/vouchers-payables/company/' + companyId);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/vouchers-payables/delete/',id);
	};
	
	
	this.isRrNumberValid = function(companyId, rrNumber){
		return $http.get(globalConfig.baseUrl + '/rest/vouchers-payables/company/' + companyId + '/rr-number/' + rrNumber);
	};
	
	this.approve = function(pvId, userId){
		return $http.post(globalConfig.baseUrl + '/rest/vouchers-payables/approve/' + pvId + '/user/' + userId);
	};
	
	this.getIdByNumberAndCompany = function (companyId, number){
		return $http.get(globalConfig.baseUrl + '/rest/vouchers-payables/company/' + companyId + '/number/' + number)
	};
	
	this.approve = function(vpId, userId){
		return $http.post(globalConfig.baseUrl + '/rest/vouchers-payables/approve/' + vpId + '/user/' + userId);
	};
	
	this.getByCompanyAndVendorAndStatus = function (companyId, vendorId, status){
		return $http.get(globalConfig.baseUrl + '/rest/vouchers-payables/company/' + companyId + '/vendor/' + vendorId +'/status/' + status);
	};
	
	this.getByCompanyAndDates = function (companyId, startDate, endDate){
		return $http.get(globalConfig.baseUrl + '/rest/vouchers-payables/company/' + companyId + '/start/' + startDate + '/end/' +endDate);
	};
}

/**
 * @ngdoc service
 * @name VouchersPayablesService
 * @module components.auth
 *
 */

angular.module('admin.accounting').service('VouchersPayablesService', VouchersPayablesService);
