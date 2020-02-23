function MoInventoryService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/moInventory');
	};

	this.save = function(data) {
		return $http.post(globalConfig.baseUrl + '/rest/moInventory', data);
	};

	this.saveWithLotNumber = function(data) {
		return $http.post(globalConfig.baseUrl + '/rest/moInventory/lotnumber', data);
	};

	// this.update = function(approvedItem) {
	// 	return $http.post(globalConfig.baseUrl + '/rest/approved-items/', approvedItem);
	// };

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/moInventory/' + id);
	};
	
	this.listByCompany = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/moInventory/company/' + companyId);
	};

	this.listByCompanyAndNonlotNumber = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/moInventory/nonlotnumber/company/' + companyId);
	};

	this.listByCompanyAndRemainingBatchSize = function(companyId) {
		return $http.get(globalConfig.baseUrl + '/rest/moInventory/remainingBatchSize/company/' + companyId);
	};

    
    this.listByFinishedGood = function(finishedGoodId) {
		return $http.get(globalConfig.baseUrl + '/rest/moInventory/finishedGood/' + finishedGoodId);
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
angular.module('admin.rnd').service('MoInventoryService', MoInventoryService);
