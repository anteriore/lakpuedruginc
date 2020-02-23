function CompanyService($http, globalConfig) {

  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/companies');
  };

  this.save = function (company) {
    return $http.post(globalConfig.baseUrl + '/rest/companies', company);
  };

  this.update = function (company) {
    return $http.post(globalConfig.baseUrl + '/rest/companies/', company);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/companies/' + id);
  };
}

/**
 * @ngdoc service
 * @name CompanyService
 * @module components.auth
 *
 */
angular
  .module('admin.users')
  .service('CompanyService', CompanyService);
