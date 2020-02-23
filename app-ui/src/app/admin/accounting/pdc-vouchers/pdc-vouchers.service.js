function PdcVouchersService($http, globalConfig) {

	this.list = function() {
		return $http.get(globalConfig.baseUrl + '/rest/pdc-vouchers');
	};

	this.save = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/pdc-vouchers', client);
	};

	this.update = function(client) {
		return $http.post(globalConfig.baseUrl + '/rest/pdc-vouchers/', client);
	};

	this.get = function(id) {
		return $http.get(globalConfig.baseUrl + '/rest/pdc-vouchers/' + id);
	};
	
	this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/pdc-vouchers/delete/',id);
	};
	
}

/**
 * @ngdoc service
 * @name PdcVouchersService
 * @module components.auth
 *
 */
angular.module('admin.accounting').service('PdcVouchersService', PdcVouchersService);
