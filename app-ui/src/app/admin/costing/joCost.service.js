
function JoCostService($http, globalConfig) {
  return {
    list: function() {
      return $http.get(globalConfig.baseUrl + '/rest/joCosts');
    },
    listByCompany: function(companyId) {
      return $http.get(globalConfig.baseUrl + '/rest/joCosts/company/' + companyId);
    },
    one: function(id) {
      return $http.get(globalConfig.baseUrl + '/rest/joCosts/' + id);
    },
    save: function(obj) {
      return $http.post(globalConfig.baseUrl + '/rest/joCosts', obj);
    },
    delete: function(id) {
      return $http.delete(globalConfig.baseUrl + '/rest/joCosts/' + id);
    }
  }
}


angular
  .module('admin.dashboard')
  .factory('JoCostService', JoCostService);