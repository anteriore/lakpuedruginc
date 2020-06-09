function CategoryService($http, globalConfig) {
  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/category');
  };

  this.save = function (category) {
    return $http.post(globalConfig.baseUrl + '/rest/category', category);
  };

  this.update = function (category) {
    return $http.post(globalConfig.baseUrl + '/rest/category/', category);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/category/' + id);
  };

  this.listByCompany = function (companyId) {
    return $http.get(
      globalConfig.baseUrl + '/rest/category/company/' + companyId
    );
  };

  this.delete = function (id) {
    return $http.post(globalConfig.baseUrl + '/rest/category/delete/', id);
  };
}

/**
 * @ngdoc service
 * @name CategoryService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('CategoryService', CategoryService);
