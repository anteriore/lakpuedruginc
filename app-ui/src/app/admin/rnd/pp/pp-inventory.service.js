function PpInventoryService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/ppInventory');
	};

	this.save = function(data) {
		return $http.post(globalConfig.baseUrl + '/rest/ppInventory', data);
	};

	// this.update = function(approvedItem) {
	// 	return $http.post(globalConfig.baseUrl + '/rest/approved-items/', approvedItem);
	// };

	// this.get = function(id) {
	// 	return $http.get(globalConfig.baseUrl + '/rest/approved-items/' + id);
	// };
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/ppInventory/company/' + companyId);
    };
    
	
	// this.delete = function(id){
	// 	return $http.post(globalConfig.baseUrl + '/rest/approved-items/delete/',id);
	// };
}

/**
 * @ngdoc service
 * @name MoInventoryService
 * @module components.auth
 *
 */
angular.module('admin.rnd').service('PpInventoryService', PpInventoryService);
