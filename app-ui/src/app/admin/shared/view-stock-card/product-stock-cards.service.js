 function ProductStockCardService($http, globalConfig) {

		this.list = function() {
			return $http.get(globalConfig.baseUrl + '/rest/product-stock-cards');
		};

		this.save = function(materialReevaluation) {
			return $http.post(globalConfig.baseUrl + '/rest/product-stock-cards', materialReevaluation);
		};

		this.update = function(materialReevaluation) {
			return $http.post(globalConfig.baseUrl + '/rest/product-stock-cards/', materialReevaluation);
		};

		this.get = function(id) {
			return $http.get(globalConfig.baseUrl + '/rest/product-stock-cards/' + id);
		};
		
		this.listByCompany = function(companyId) {
			return $http.get(globalConfig.baseUrl + '/rest/product-stock-cards/company/' + companyId);
		};
		
		this.listByCompanyAndProduct = function(companyId,productId){
			return $http.get(globalConfig.baseUrl + '/rest/product-stock-cards/company/'+companyId+'/product/' + productId);
		};
	}

	/**
	 * @ngdoc service
	 * @name ProductStockCardService
	 * @module components.auth
	 *
	 */
	angular.module('admin.shared').service('ProductStockCardService', ProductStockCardService);
