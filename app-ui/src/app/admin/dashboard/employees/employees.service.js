function EmployeesService($http, globalConfig) {
  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/employees');
  };

  this.paginate = function (itemsPerPage, offset) {
    console.log(itemsPerPage, offset);
    return $http.get(
      globalConfig.baseUrl +
        '/rest/employees/paginate/' +
        itemsPerPage +
        '/' +
        offset
    );
  };

  this.save = function (employee) {
    return $http.post(globalConfig.baseUrl + '/rest/employees', employee);
  };

  this.update = function (employee) {
    return $http.post(globalConfig.baseUrl + '/rest/employees/', employee);
  };

  this.get = function (id) {
    console.log(id);
    return $http.get(globalConfig.baseUrl + '/rest/employees/' + id);
  };

  this.listByCompany = function (id) {
    console.log(id);
    return $http.get(globalConfig.baseUrl + '/rest/employees/company/' + id);
  };

  this.delete = function (id) {
    return $http.post(globalConfig.baseUrl + '/rest/employees/delete/', id);
  };
}

/**
 * @ngdoc service
 * @name EmployeesService
 * @module components.auth
 *
 */
angular.module('admin.dashboard').service('EmployeesService', EmployeesService);
