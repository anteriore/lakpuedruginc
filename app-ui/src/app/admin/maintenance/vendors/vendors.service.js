function VendorsService($http, globalConfig) {
  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/vendors');
  };

  this.save = function (vendor) {
    return $http.post(globalConfig.baseUrl + '/rest/vendors', vendor);
  };

  this.update = function (vendor) {
    return $http.post(globalConfig.baseUrl + '/rest/vendors/', vendor);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/vendors/' + id);
  };

  this.listByCompany = function (companyId) {
    return $http.get(
      globalConfig.baseUrl + '/rest/vendors/company/' + companyId
    );
  };

  this.paginate = function (itemsPerPage, offset, companyId) {
    return $http.get(
      globalConfig.baseUrl +
        '/rest/vendors/paginate/' +
        itemsPerPage +
        '/' +
        offset +
        '/company/' +
        companyId
    );
  };

  this.delete = function (id) {
    return $http.post(globalConfig.baseUrl + '/rest/vendors/delete/', id);
  };
}

/**
 * @ngdoc service
 * @name VendorsService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('VendorsService', VendorsService);
