function GroupService($http, globalConfig) {
  this.list = function () {
    return $http.get(globalConfig.baseUrl + '/rest/group');
  };

  this.save = function (group) {
    return $http.post(globalConfig.baseUrl + '/rest/group', group);
  };

  this.update = function (group) {
    return $http.post(globalConfig.baseUrl + '/rest/group/', group);
  };

  this.get = function (id) {
    return $http.get(globalConfig.baseUrl + '/rest/group/' + id);
  };

  this.listByCompany = function (companyId) {
    return $http.get(globalConfig.baseUrl + '/rest/group/company/' + companyId);
  };

  this.delete = function (id) {
    return $http.post(globalConfig.baseUrl + '/rest/group/delete/', id);
  };
}

/**
 * @ngdoc service
 * @name GroupService
 * @module components.auth
 *
 */
angular.module('admin.maintenance').service('GroupService', GroupService);
