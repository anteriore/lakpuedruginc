function EmployeesService($http, globalConfig) {

  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/employees');
  };

  this.save = function (employee) {
    return $http.post(globalConfig.baseUrl + '/rest/employees', employee);
  };

  this.update = function (employee) {
    return $http.post(globalConfig.baseUrl + '/rest/employees/', employee);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/employees/' + id);
  };

  this.listByCompany = function(id) {
	return $http.get(globalConfig.baseUrl + '/rest/employees/company/' + id);  
  };

  this.delete = function(id){
		return $http.post(globalConfig.baseUrl + '/rest/employees/delete/',id);
	};
}

/**
 * @ngdoc service
 * @name EmployeesService
 * @module components.auth
 *
 */
angular
  .module('admin.dashboard')
  .service('EmployeesService', EmployeesService);
